import { parse, createSchemas, checkFileExist } from '../utils/index.js';
import { Logger } from '../logger/index.js';
import path from 'path';

export default class ReadFileCommand {
  _context;
  _parsedObject;
  _schemaNameList;
  _openApiKey;

  setContext(context) {
    this._context = context;
    return this;
  }

  async exec() {
    const inputPath = this._context.inputPath;
    const ai = this._context.ai;
    const parsedObject = await parse(path.resolve(process.cwd(), inputPath));

    // read yaml file
    if (parsedObject === null) {
      Logger.error(`Unexpected yaml parse error occured!`);
      process.exit(1);
    }
    const schemaNameList = createSchemas(parsedObject);
    if (schemaNameList === null) {
      Logger.error('Unexpected yaml type. Schemas does not exists.');
      process.exit(1);
    }

    // read openapi key
    if (ai && !checkFileExist(path.resolve(process.cwd(), '.otdgenai'))) {
      Logger.error(`Can not find ${path.resolve(process.cwd(), '.otdgenai')}`);
      process.exit(1);
    }
    if (ai && checkFileExist(path.resolve(process.cwd(), '.otdgenai'))) {
      const openapiKey = await parse(path.resolve(process.cwd(), '.otdgenai'));
      if (openapiKey.split.length < 2) {
        Logger.error('Unexpected openapi key format');
        process.exit(1);
      }
      this._openApiKey = openapiKey.split('=')[1];
    }

    this._schemaNameList = schemaNameList;
    this._parsedObject = parsedObject;
  }

  getParsedObject() {
    return this._parsedObject;
  }

  getSchemaNameList() {
    return this._schemaNameList;
  }

  getOpenApiKey() {
    return this._openApiKey;
  }
}