import { Logger } from '../logger/index.js';
import { DEFAULT_ARRAY_TYPE_TEST_DATA_LENGTH } from '../const/index.js';
import {
	createRandomNumberByRange,
	createRandomNumberByMaxValueStateless,
	createRandomStringByRange,
	getRandomYmd,
	getRandomYmdhhmmss,
	createRandomStringByMaxLengtheStateless,
	createRandomBooleanStateless,
	getRandomYmdStateless,
	getRandomYmdhhmmssStateless
} from '../utils/index.js';

export default class GenerateDataCommand {
	_context;
	_schemaDataMap;
	_schemas;

	setContext(context) {
		this._context = context;
		return this;
	}

	exec(schemaNameList, parsedObject) {
		const context = this._context;
		this._schemas = parsedObject.components.schemas; // all schemas
		const schemaDataMap = new Map();

		// Generating all schemas' test data from schema name list
		for (let i = 0; i < schemaNameList.length; i++) {
			let targetSchemaName = schemaNameList[i].replaceAll('.yaml', '');
			if (context.ignoreList.indexOf(targetSchemaName) !== -1) {
				Logger.warn(
					`[ignore] output: ==> ${context.outputPath}/${targetSchemaName}${context.extension}`
				);
				continue;
			}

			if (this._schemas[targetSchemaName].$ref)
				targetSchemaName = schema.$ref.replace('#/components/schemas/', '');

			const data = this._generateNumberOfTargetSchemaDataSpecifiedByOption(
				targetSchemaName,
				{
					n: context.numberOfData,
					stateless: context.stateless,
					exampleSuffix: context.exampleSuffix,
					depthOfSchemaRefRecursion: 0
				}
			);

			schemaDataMap.set(targetSchemaName, data);
		}
		this._schemaDataMap = schemaDataMap;
	}

	getSchemaDataMap() {
		return this._schemaDataMap;
	}

	/**
	 * Create schema sample data
	 * @param {*} schemas
	 * @param {*} targetSchemaName
	 * @param {*} options
	 * @returns {Array<object>} sample data
	 */
	_generateNumberOfTargetSchemaDataSpecifiedByOption = (
		targetSchemaName,
		options,
		depthOfSchemaRefRecursion = 0
	) => {
		const schema = this._schemas[targetSchemaName];
		const numberOfData = options.n;
		const schemaProperties = schema.properties;
		const resultArray = [];

		// create sample data for a specified number of pieces.
		for (let i = 0; i < numberOfData; i++) {
			resultArray.push(
				this._generateDataFromTargetSchemaProperties(
					schemaProperties,
					targetSchemaName,
					options,
					i,
					depthOfSchemaRefRecursion
				)
			);
		}
		return resultArray;
	};

	_generateDataFromTargetSchemaProperties = (
		properties,
		name,
		options,
		indexOfMultiData = 0,
		depthOfSchemaRefRecursion
	) => {
		const element = {};
		const stateless = options.stateless;

		// Generating data from properties
		Object.keys(properties).forEach((key) => {
			const property = properties[key];
			let data;

			// enum type
			if (property.enum && property.enum.length > 0) {
				data = `${property.enum[indexOfMultiData % property.enum.length]}`;
			}

			// if exists example, data will not be generated randomly but set example with suffix
			const suffix = options.exampleSuffix ? `_${indexOfMultiData}` : '';
			data =
				property.example && !(property.enum && property.enum.length > 0)
					? `${property.example}${suffix}`
					: data;

			// generate test data recursively if the property type is $ref.
			if (property.$ref) {
				data = this._generateNumberOfTargetSchemaDataSpecifiedByOption(
					property.$ref.replace('#/components/schemas/', ''),
					{ ...options, n: 1 },
					depthOfSchemaRefRecursion
				)[0];
			}

			if (property.type === 'object') {
				data = this._generateDataFromTargetSchemaProperties(
					property.properties,
					name,
					options,
					indexOfMultiData,
					depthOfSchemaRefRecursion
				);
			}

			// otherwise, generate data from property type
			if (data === undefined) {
				const statelessHashKey = `${name}-${key}-${depthOfSchemaRefRecursion}-${indexOfMultiData}`;
				data = this._generateDataFromPropertyType(
					property,
					stateless,
					options.exampleSuffix,
					options,
					depthOfSchemaRefRecursion,
					statelessHashKey
				);
			}
			element[key] = data;
		});
		return element;
	};

	_generateDataFromPropertyType = (
		property,
		stateless = false,
		exampleSuffix,
		options,
		depthOfSchemaRefRecursion,
		statelessHashKey = ''
	) => {
		let value;
		switch (property.type) {
			case 'string':
				if (property.example) {
					value = property.example;
					break;
				}

				if (property.format === 'date-time') {
					// create a random date-time data
					value = stateless
						? getRandomYmdhhmmssStateless('2000/01/01', statelessHashKey)
						: getRandomYmdhhmmss('2000/01/01');
				} else if (property.format === 'date') {
					// create a random date data
					value = stateless
						? getRandomYmdStateless('2000/01/01', statelessHashKey)
						: getRandomYmd('2000/01/01');
				} else {
					value = stateless
						? createRandomStringByMaxLengtheStateless(
								statelessHashKey,
								property.maxLength
						  )
						: createRandomStringByRange(property.minLength, property.maxLength);
				}
				break;
			case 'number':
				// create a random number
				value = stateless
					? createRandomNumberByMaxValueStateless(
							statelessHashKey,
							property.minimum,
							property.maximum
					  )
					: createRandomNumberByRange(property.minimum, property.maximum);
				break;
			case 'integer':
				// create a random number
				value = stateless
					? createRandomNumberByMaxValueStateless(
							statelessHashKey,
							property.minimum,
							property.maximum
					  )
					: createRandomNumberByRange(property.minimum, property.maximum);
				break;
			case 'array':
				if (property.items === undefined) {
					value = [];
					break;
				}
				const array = [];
				for (let k = 0; k < DEFAULT_ARRAY_TYPE_TEST_DATA_LENGTH; k++) {
					const suffix = exampleSuffix ? `_${k}` : '';
					if (property.items.$ref) {
						const targetSchemaName = property.items.$ref.replace(
							'#/components/schemas/',
							''
						);
						const schema = this._schemas[targetSchemaName];
						const schemaProperties = schema.properties;
						const data = this._generateDataFromTargetSchemaProperties(
							schemaProperties,
							targetSchemaName,
							options,
							k,
							depthOfSchemaRefRecursion
						);
						array.push(data);
						continue;
					}
					if (property.items.type === 'object') {
						array.push(
							this._generateDataFromPropertyType(
								property.items.properties,
								stateless,
								options,
								depthOfSchemaRefRecursion,
								`${statelessHashKey}-${k}`
							) + suffix
						);
					} else {
						array.push(
							this._generateDataFromPropertyType(
								property.items,
								stateless,
								options,
								depthOfSchemaRefRecursion,
								`${statelessHashKey}-${k}`
							) + suffix
						);
					}
				}
				value = array;
				break;
			case 'boolean':
				value = stateless
					? createRandomBooleanStateless(statelessHashKey)
					: Math.random() > 1 / 2;
				break;
			default:
				// otherwise; {}
				value = {};
		}

		return value;
	};
}
