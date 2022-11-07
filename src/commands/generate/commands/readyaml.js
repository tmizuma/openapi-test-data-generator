import { parse, createSchemas } from '../parse.js';
import { Logger } from '../logger/index.js';
import path from 'path';

export default class ReadYamlCommand {
  _context;
  _parsedObject;
  _schemas;

  setContext(context) {
    this._context = context;
    return this;
  }

  async exec() {
    const inputPath = this._context.inputPath;
    const parsedObject = await parse(path.resolve(process.cwd(), inputPath));

    if (parsedObject === null) {
      Logger.error(`Unexpected yaml parse error occured!`);
      process.exit(1);
    }
    const schemas = createSchemas(parsedObject);
    if (schemas === null) {
      Logger.error('Unexpected yaml type. Schemas does not exists.');
      process.exit(1);
    }

    this._schemas = schemas;
    this._parsedObject = parsedObject;
  }

  getParsedObject() {
    return this._parsedObject;
  }

  getSchemas() {
    return this._schemas;
  }
}