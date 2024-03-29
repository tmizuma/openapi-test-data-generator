import { generate } from '../../../commands/generate';
import fs from 'fs';
import path from 'path';
import { jest } from '@jest/globals';
import { fileURLToPath } from 'url';

jest.mock('fs');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputFilesPath = path.join(__dirname, 'output');

describe('generate-command', () => {
	beforeEach(async () => {
		fs.mkdirSync(outputFilesPath);
	});
	afterEach(async () => {
		fs.rmSync(outputFilesPath, { recursive: true, force: true });
	});
	test('The number of properties', async () => {
		const result = await generate({
			input: `${__dirname}/test-data/openapi-snapshot.yaml`,
			output: outputFilesPath,
			numberOfArrayData: 3,
			extension: '.ts'
		});

		expect(Object.keys(result).length).toBe(3);
		expect(result['Employee'] !== undefined).toBe(true);
		expect(result['Profile'] !== undefined).toBe(true);
		expect(result['Member'] !== undefined).toBe(true);
		const employee = result['Employee'];
		const profile = result['Profile'];
		const member = result['Member'];
		expect(employee.length).toBe(3);
		expect(profile.length).toBe(3);
		expect(member.length).toBe(3);
	});

	test('Check if there are correct extension(.ts) files', async () => {
		await generate({
			input: `${__dirname}/test-data/openapi-snapshot.yaml`,
			output: outputFilesPath,
			numberOfArrayData: 3,
			extension: '.ts'
		});
		expect(fs.existsSync(`${outputFilesPath}/Employee.ts`)).toBe(true);
		expect(fs.existsSync(`${outputFilesPath}/Profile.ts`)).toBe(true);
		expect(fs.existsSync(`${outputFilesPath}/Member.ts`)).toBe(true);
		expect(fs.existsSync(`${outputFilesPath}/Employee.js`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Profile.js`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Member.js`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Employee.json`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Profile.json`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Member.json`)).toBe(false);
	});
	test('Check if there are correct extension(.js) files', async () => {
		await generate({
			input: `${__dirname}/test-data/openapi-snapshot.yaml`,
			output: outputFilesPath,
			numberOfArrayData: 3,
			extension: '.js'
		});
		expect(fs.existsSync(`${outputFilesPath}/Employee.ts`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Profile.ts`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Member.ts`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Employee.js`)).toBe(true);
		expect(fs.existsSync(`${outputFilesPath}/Profile.js`)).toBe(true);
		expect(fs.existsSync(`${outputFilesPath}/Member.js`)).toBe(true);
		expect(fs.existsSync(`${outputFilesPath}/Employee.json`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Profile.json`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Member.json`)).toBe(false);
	});

	test('Check if there are correct extension(.json) files', async () => {
		await generate({
			input: `${__dirname}/test-data/openapi-snapshot.yaml`,
			output: outputFilesPath,
			numberOfArrayData: 3,
			extension: '.json'
		});
		expect(fs.existsSync(`${outputFilesPath}/Employee.ts`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Profile.ts`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Member.ts`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Employee.js`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Profile.js`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Member.js`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Employee.json`)).toBe(true);
		expect(fs.existsSync(`${outputFilesPath}/Profile.json`)).toBe(true);
		expect(fs.existsSync(`${outputFilesPath}/Member.json`)).toBe(true);
	});

	test('process.exit(1) will be called when unexpected extension is specified', async () => {
		const mockExit = jest.spyOn(process, 'exit').mockImplementation((_) => {
			/* process.exit(1) */
		});
		await generate({
			input: `${__dirname}/test-data/openapi-snapshot.yaml`,
			output: outputFilesPath,
			numberOfArrayData: 3,
			extension: '.unexpected'
		});
		expect(mockExit).toHaveBeenCalledWith(1);
		mockExit.mockRestore();
		expect(fs.existsSync(`${outputFilesPath}/Employee.ts`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Profile.ts`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Member.ts`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Employee.js`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Profile.js`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Member.js`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Employee.json`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Profile.json`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Member.json`)).toBe(false);
	});

	test('-ignore option', async () => {
		await generate({
			input: `${__dirname}/test-data/openapi-snapshot.yaml`,
			output: outputFilesPath,
			numberOfArrayData: 3,
			ignore: 'Employee'
		});
		expect(fs.existsSync(`${outputFilesPath}/Employee.ts`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Profile.ts`)).toBe(true);
		expect(fs.existsSync(`${outputFilesPath}/Member.ts`)).toBe(true);
	});

	test('-ignore: multiple ignore', async () => {
		await generate({
			input: `${__dirname}/test-data/openapi-snapshot.yaml`,
			output: outputFilesPath,
			numberOfArrayData: 3,
			ignore: 'Employee, Profile'
		});
		expect(fs.existsSync(`${outputFilesPath}/Employee.ts`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Profile.ts`)).toBe(false);
		expect(fs.existsSync(`${outputFilesPath}/Member.ts`)).toBe(true);
	});

	test('stateless snapshot test', async () => {
		const result = await generate({
			input: `${__dirname}/test-data/openapi-snapshot.yaml`,
			output: outputFilesPath,
			numberOfArrayData: 4,
			extension: '.ts',
			stateless: 'true'
		});
		expect(result).toMatchSnapshot();
	});
});
