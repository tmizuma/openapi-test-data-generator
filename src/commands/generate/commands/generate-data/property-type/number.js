import {
	createRandomNumberByMaxValueStateless,
	createRandomNumberByRange
} from '../../../utils';

export const generateNumberTypeData = (
	property,
	statelessHashKey,
	stateless
) => {
	return stateless
		? createRandomNumberByMaxValueStateless(
				statelessHashKey,
				property.minimum,
				property.maximum
		  )
		: createRandomNumberByRange(property.minimum, property.maximum);
};
