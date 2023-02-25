import { generate } from '../../../commands/generate';
import fs from 'fs';
import path from 'path';
import { jest } from '@jest/globals';
import { fileURLToPath } from 'url';

jest.mock('fs');
const __filename = fileURLToPath(
  import.meta.url);
const __dirname = path.dirname(__filename);
const outputFilesPath = path.join(__dirname, 'output');

describe('generate-command', () => {
  beforeEach(async() => {
    fs.mkdirSync(outputFilesPath);
  });
  afterEach(async() => {
    fs.rmSync(outputFilesPath, { recursive: true, force: true });
  });
  test('The number of properties', async() => {
    const result = await generate({
      input: `${__dirname}/test-data/openapi-snapshot.yaml`,
      output: outputFilesPath,
      numberOfArrayData: 3,
      extension: '.ts'
    });
    expect(result.size).toBe(3);
    expect(result.has('Employee')).toBe(true);
    expect(result.has('Profile')).toBe(true);
    const employee = result.get('Employee');
    const profile = result.get('Profile');
    const member = result.get('Member');
    expect(employee.length).toBe(3);
    expect(profile.length).toBe(3);
    expect(member.length).toBe(3);
  });

  test('Check if there are correct extension(.ts) files', async() => {
    await generate({
      input: `${__dirname}/test-data/openapi-snapshot.yaml`,
      output: outputFilesPath,
      numberOfArrayData: 3,
      extension: '.ts'
    });
    expect(fs.existsSync(`${outputFilesPath}/Employee.ts`)).toBe(true);
    expect(fs.existsSync(`${outputFilesPath}/Profile.ts`)).toBe(true);
    expect(fs.existsSync(`${outputFilesPath}/Employee.js`)).toBe(false);
    expect(fs.existsSync(`${outputFilesPath}/Profile.js`)).toBe(false);
    expect(fs.existsSync(`${outputFilesPath}/Member.js`)).toBe(false);
    expect(fs.existsSync(`${outputFilesPath}/Member.js`)).toBe(false);
  });
  test('Check if there are correct extension(.js) files', async() => {
    await generate({
      input: `${__dirname}/test-data/openapi-snapshot.yaml`,
      output: outputFilesPath,
      numberOfArrayData: 3,
      extension: '.js'
    });
    expect(fs.existsSync(`${outputFilesPath}/Employee.ts`)).toBe(false);
    expect(fs.existsSync(`${outputFilesPath}/Profile.ts`)).toBe(false);
    expect(fs.existsSync(`${outputFilesPath}/Employee.js`)).toBe(true);
    expect(fs.existsSync(`${outputFilesPath}/Profile.js`)).toBe(true);
    expect(fs.existsSync(`${outputFilesPath}/Member.js`)).toBe(true);
  });

  test('-ignore option', async() => {
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

  test('-ignore: multiple ignore', async() => {
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

  test('stateless snapshot test', async() => {
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