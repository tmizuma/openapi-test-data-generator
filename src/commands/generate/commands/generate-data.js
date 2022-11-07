import { createSampleDataJson } from '../generator/sampledata.js';
import { Logger } from '../logger/index.js';

export default class GenerateDataCommand {
  _context;
  _schemaDataMap;

  setContext(context) {
    this._context = context;
    return this;
  }

  exec(schemas, parsedObject) {
    const context = this._context;
    const schemaDataMap = new Map();
    schemas.forEach((s) => {
      const schemaName = s.replaceAll('.yaml', '');
      if (context.ignoreList.indexOf(schemaName) === -1) {
        schemaDataMap.set(
          schemaName,
          createSampleDataJson(parsedObject.components.schemas, schemaName, {
            n: context.numberOfArrayTestData,
            stateless: context.stateless,
            exampleSuffix: context.exampleSuffix
          })
        );
      } else {
        Logger.warn(
          `[ignore] output: ==> ${context.outputPath}/${schemaName}${context.extension}`
        );
      }
    });
    this._schemaDataMap = schemaDataMap;
  }

  getSchemaDataMap() {
    return this._schemaDataMap;
  }
}