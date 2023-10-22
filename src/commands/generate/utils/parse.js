import chalk from 'chalk';
import fs from 'fs';
import yaml from 'js-yaml';

export const parse = (fullPath) => {
	const yamlText = fs.readFileSync(fullPath.trim(), 'utf8');
	return yaml.load(yamlText);
};

export const createSchemas = (yaml) => {
	if (!yaml || !yaml.components || !yaml.components.schemas) {
		console.log(chalk.red.bold(`components.schemas fields not found.`));
		return null;
	}
	return Object.keys(yaml.components.schemas);
};

export const checkFileExist = (fullPath) => {
	return fs.existsSync(fullPath.replaceAll(' ', ''));
};
