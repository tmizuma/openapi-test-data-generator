import { createRandomBooleanStateless } from '../../../utils';

export const generateBooleanTypeData = (statelessHashKey, stateless) => {
	return stateless
		? createRandomBooleanStateless(statelessHashKey)
		: Math.random() > 1 / 2;
};
