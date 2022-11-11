import { createRandomBooleanStateless } from '../../../utils/index.js';

export const generateBooleanTypeData = (statelessHashKey, stateless) => {
	return stateless
		? createRandomBooleanStateless(statelessHashKey)
		: Math.random() > 1 / 2;
};
