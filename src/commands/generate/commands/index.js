export default class Generator {
  _context;
  _readCommand;
  _generateCommand;
  _outputCommand;
  _generatedDataObject;

  constructor(context, readCommand, generateCommand, outputCommand) {
    this._readCommand = readCommand.setContext(context);
    this._generateCommand = generateCommand.setContext(context);
    this._outputCommand = outputCommand.setContext(context);
  }

  async exec() {
    const input = await this.read();
    this._generatedDataObject = await this.generate(input);
    await this.output(this._generatedDataObject);
  }

  async read() {
    await this._readCommand.exec();
    const parsedObject = this._readCommand.getParsedObject();
    const _schemaNameList = this._readCommand.getSchemaNameList();
    return { parsedObject, _schemaNameList };
  }

  async generate(input) {
    this._generateCommand.exec(input._schemaNameList, input.parsedObject);
    return this._generateCommand.getSchemaDataMap();
  }

  async output(parsedObject) {
    await this._outputCommand.exec(parsedObject);
  }

  getGeneratedDataObject() {
    return this._generatedDataObject;
  }
}