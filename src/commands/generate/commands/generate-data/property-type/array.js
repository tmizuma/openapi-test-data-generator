import { Type } from '../../../../enum/index.js';
import {
	DEFAULT_ARRAY_TYPE_TEST_DATA_LENGTH,
	NEED_TO_BE_REPLACE_BY_OPENAI_RESPONSE
} from '../../../const/index.js';

export const generateArrayTypeData = (
	schemas,
	property,
	stateless,
	options,
	depthOfSchemaRefRecursion,
	statelessHashKey,
	cbGenerateDataFromTargetSchemaProperties,
	cbGenerateDataFromPropertyType
) => {
	if (property.items === undefined) {
		return [];
	}
	const array = [];
	for (let k = 0; k < DEFAULT_ARRAY_TYPE_TEST_DATA_LENGTH; k++) {
		const suffix = options.exampleSuffix ? `_${k}` : '';
		// array of ref
		if (property.items.$ref) {
			const targetSchemaName = property.items.$ref.replace(
				'#/components/schemas/',
				''
			);
			const schema = schemas[targetSchemaName];
			const schemaProperties = schema.properties;
			const data = cbGenerateDataFromTargetSchemaProperties(
				schemaProperties,
				targetSchemaName,
				options,
				k,
				depthOfSchemaRefRecursion + 1
			);
			if (data) {
				array.push(data);
			}
			continue;
		}
		// array of object
		if (property.items.type === Type.OBJECT) {
			array.push(
				cbGenerateDataFromPropertyType(
					property.items.properties,
					stateless,
					options,
					depthOfSchemaRefRecursion,
					`${statelessHashKey}-${k}`
				) + suffix
			);
			continue;
		}
		// otherwise
		let value = cbGenerateDataFromPropertyType(
			{ ...property.items, key: property.key },
			stateless,
			options,
			depthOfSchemaRefRecursion,
			`${statelessHashKey}-${k}`
		);
		if (value !== NEED_TO_BE_REPLACE_BY_OPENAI_RESPONSE) value += suffix;
		array.push(value);
	}
	return array;
};
