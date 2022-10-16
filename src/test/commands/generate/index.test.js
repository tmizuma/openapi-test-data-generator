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
  beforeEach(() => {
    fs.mkdirSync(outputFilesPath);
  })
  afterEach(() => {
    fs.rmSync(outputFilesPath, { recursive: true, force: true });
  })
  test('snapshot test', async() => {
    const result = await generate({
      input: `${__dirname}/test-data/openapi-snapshot.yaml`,
      output: outputFilesPath,
    })
    const obj = Object.fromEntries(result);
    expect(obj).toMatchSnapshot()
  })
})