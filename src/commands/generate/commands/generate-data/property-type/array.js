import { Type } from '../../../../enum';
import { DEFAULT_ARRAY_TYPE_TEST_DATA_LENGTH } from '../../../const';

export const generateArrayTypeData = (
	schemas,
	property,
	stateless,
	exampleSuffix,
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
		const suffix = exampleSuffix ? `_${k}` : '';

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
		array.push(
			cbGenerateDataFromPropertyType(
				property.items,
				stateless,
				options,
				depthOfSchemaRefRecursion,
				`${statelessHashKey}-${k}`
			) + suffix
		);
	}
	return array;
};
