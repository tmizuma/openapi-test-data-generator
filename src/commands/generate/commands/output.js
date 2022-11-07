import { exportFileBySampleData } from '../utils/index.js';

export default class OutputCommand {
	_context;

	setContext(context) {
		this._context = context;
		return this;
	}

	async exec(schemaDataMap) {
		const context = this._context;
		for (let [k, v] of schemaDataMap) {
			await exportFileBySampleData(k, v, context.outputPath, context.extension);
		}
	}
}
