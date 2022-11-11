import { Logger } from '../../logger/index.js';
import { MAX_RECURSION } from '../../const/index.js';
import { generateNumberTypeData } from './property-type/number.js';
import { generateStringTypeData } from './property-type/string.js';
import { generateBooleanTypeData } from './property-type/boolean.js';
import { generateArrayTypeData } from './property-type/array.js';
import { Type } from '../../../enum/type.js';

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
		if (depthOfSchemaRefRecursion >= MAX_RECURSION) {
			return [];
		}
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

		if (depthOfSchemaRefRecursion >= MAX_RECURSION) return;

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
					depthOfSchemaRefRecursion + 1
				)[0];
			}

			if (property.type === Type.OBJECT) {
				data = this._generateDataFromTargetSchemaProperties(
					property.properties,
					name,
					options,
					indexOfMultiData,
					depthOfSchemaRefRecursion + 1
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
			case Type.STRING:
				value = generateStringTypeData(property, statelessHashKey, stateless);
				break;
			case Type.NUMBER:
				// create a random number
				value = generateNumberTypeData(property, statelessHashKey, stateless);
				break;
			case Type.INTEGER:
				// create a random number
				value = generateNumberTypeData(property, statelessHashKey, stateless);
				break;
			case Type.BOOLEAN:
				value = generateBooleanTypeData(statelessHashKey, stateless);
				break;
			case Type.ARRAY:
				value = generateArrayTypeData(
					this._schemas,
					property,
					stateless,
					exampleSuffix,
					options,
					depthOfSchemaRefRecursion,
					statelessHashKey,
					this._generateDataFromTargetSchemaProperties,
					this._generateDataFromPropertyType
				);
				break;
			default:
				// otherwise; {}
				value = {};
		}

		return value;
	};
}
