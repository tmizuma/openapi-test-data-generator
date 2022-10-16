import { generate } from "../../../commands/generate";
import fs from "fs";
import path from "path";
import { jest } from '@jest/globals'
import { fileURLToPath } from "url";

jest.mock("fs")
const __filename = fileURLToPath(
  import.meta.url);
const __dirname = path.dirname(__filename);
const outputFilesPath = path.join(__dirname, "output");

describe('generate-command', () => {
  beforeEach(async() => {
    fs.mkdirSync(outputFilesPath);
  })
  afterEach(async() => {
    fs.rmSync(outputFilesPath, { recursive: true, force: true });
  })
  test('The number of properties', async() => {
    const result = await generate({
      input: `${__dirname}/test-data/openapi-snapshot.yaml`,
      output: outputFilesPath,
      "numberOfArrayData": 3,
      extension: ".ts"
    })
    expect(result.size).toBe(2)
    expect(result.has("Employee")).toBe(true)
    expect(result.has("Profile")).toBe(true)
    const employee = result.get("Employee")
    const profile = result.get("Profile")
    expect(employee.length).toBe(3)
    expect(profile.length).toBe(3)
  })

  test('Check if there are correct extension(.ts) files', async() => {
    await generate({
      input: `${__dirname}/test-data/openapi-snapshot.yaml`,
      output: outputFilesPath,
      "numberOfArrayData": 3,
      extension: ".ts"
    })
    const exists = fs.existsSync(`${outputFilesPath}/Employee.ts`)
    expect(exists).toBe(true)
  })
  test('Check if there are correct extension(.js) files', async() => {
    await generate({
      input: `${__dirname}/test-data/openapi-snapshot.yaml`,
      output: outputFilesPath,
      "numberOfArrayData": 3,
      extension: ".js"
    })
    const exists = fs.existsSync(`${outputFilesPath}/Employee.js`)
    expect(exists).toBe(true)
  })
})