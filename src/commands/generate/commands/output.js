import { exportFileBySampleData } from '../utils/index.js';

export default class OutputCommand {
  _context;

  setContext(context) {
    this._context = context;
    return this;
  }

  async exec(schemaDataMap) {
    const context = this._context;
    console.log(schemaDataMap);
    for (let key of Object.keys(schemaDataMap)) {
      await exportFileBySampleData(
        key,
        schemaDataMap[key],
        context.outputPath,
        context.extension
      );
    }
  }
}