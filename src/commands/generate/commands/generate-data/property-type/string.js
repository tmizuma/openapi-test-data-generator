import {
	createRandomStringByMaxLengtheStateless,
	createRandomStringByRange,
	getRandomYmd,
	getRandomYmdhhmmss,
	getRandomYmdhhmmssStateless,
	getRandomYmdStateless
} from '../../../utils/index.js';

export const generateStringTypeData = (
	property,
	statelessHashKey,
	stateless
) => {
	if (property.example) {
		return property.example;
	}

	if (property.format === 'date-time') {
		// create a random date-time data
		return stateless
			? getRandomYmdhhmmssStateless('2000/01/01', statelessHashKey)
			: getRandomYmdhhmmss('2000/01/01');
	} else if (property.format === 'date') {
		// create a random date data
		return stateless
			? getRandomYmdStateless('2000/01/01', statelessHashKey)
			: getRandomYmd('2000/01/01');
	}
	return stateless
		? createRandomStringByMaxLengtheStateless(
				statelessHashKey,
				property.maxLength
		  )
		: createRandomStringByRange(property.minLength, property.maxLength);
};
