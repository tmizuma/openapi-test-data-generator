export default class Generator {
  constructor(context, readCommand, generateCommand, outputCommand) {
    this.context = context;
    this._readCommand = readCommand.setContext(context);
    this._generateCommand = generateCommand.setContext(context);
    this._outputCommand = outputCommand.setContext(context);
  }

  async exec() {
    const input = await this.read();
    const parsedObject = await this.generate(input);
    await this.output(parsedObject);
    return parsedObject;
  }

  async read() {
    await this._readCommand.exec();
    const parsedObject = this._readCommand.getParsedObject();
    const schemas = this._readCommand.getSchemas();
    return { parsedObject, schemas };
  }

  async generate(input) {
    this._generateCommand.exec(input.schemas, input.parsedObject);
    return this._generateCommand.getSchemaDataMap();
  }

  async output(parsedObject) {
    await this._outputCommand.exec(parsedObject);
  }
}