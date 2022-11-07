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

/**
 * Create schema sample data
 * @param {*} schemas
 * @param {*} name
 * @param {*} options
 * @returns {Array<object>} sample data
 */
export const createSampleDataJson = (schemas, name, options) => {
	const schema = schemas[name];
	const stateless = options.stateless;
	const depthOfRecursion = options.depthOfRecursion
		? options.depthOfRecursion
		: 0;
	const numberOfArray = options.n;
	const properties = schema.properties;
	const result = [];

	if (schema.$ref) {
		const property = schema.$ref.replace('#/components/schemas/', '');
		const result = createSampleDataJson(schemas, property, {
			...options,
			depthOfRecursion: depthOfRecursion + 1
		});
		return result;
	}

	for (let i = 0; i < numberOfArray; i++) {
		// create sample data for a specified number of pieces.
		result.push(
			createSampleDataFromProperties(
				schemas,
				properties,
				name,
				depthOfRecursion,
				stateless,
				options,
				i
			)
		);
	}
	return result;
};

const createSampleDataFromProperties = (
	schemas,
	properties,
	name,
	depthOfRecursion,
	stateless,
	options,
	i = 0
) => {
	const element = {};
	Object.keys(properties).forEach((key) => {
		const property = properties[key];
		let sampleData;

		// enum type
		if (property.enum && property.enum.length > 0) {
			sampleData = `${property.enum[i % property.enum.length]}`;
		}

		// if exists example data
		const suffix = options.exampleSuffix ? `_${i}` : '';
		sampleData =
			property.example && !(property.enum && property.enum.length > 0)
				? `${property.example}${suffix}`
				: sampleData;

		// create sample data recursively if the property type is $ref.
		if (property.$ref) {
			sampleData = createSampleDataJson(
				schemas,
				property.$ref.replace('#/components/schemas/', ''),
				{ ...options, n: 1, depthOfRecursion: depthOfRecursion + 1 }
			)[0];
		}

		if (property.type === 'object') {
			sampleData = createSampleDataFromProperties(
				schemas,
				property.properties,
				name,
				depthOfRecursion,
				stateless,
				options,
				i
			);
		}

		// otherwise, create sample data from property attributes
		if (sampleData === undefined) {
			const statelessHashKey = `${name}-${key}-${depthOfRecursion}-${i}`;
			sampleData = createSampleDataFromPropertyAttributes(
				property,
				stateless,
				options.exampleSuffix,
				statelessHashKey
			);
		}
		element[key] = sampleData;
	});
	return element;
};

const createSampleDataFromPropertyAttributes = (
	property,
	stateless = false,
	exampleSuffix,
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
				if (property.items.type === 'object') {
					array.push(
						createSampleDataFromPropertyAttributes(
							property.items.properties,
							stateless,
							`${statelessHashKey}-${k}`
						) + suffix
					);
				} else {
					array.push(
						createSampleDataFromPropertyAttributes(
							property.items,
							stateless,
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
