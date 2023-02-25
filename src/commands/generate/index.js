import { validate } from './validator/index.js';
import ReadFileCommand from './commands/readfile.js';
import GenerateDataCommand from './commands/generate-data/index.js';
import OutputCommand from './commands/output.js';
import Generator from './commands/index.js';

/**
 * generate test data
 * @param {*} args
 * @returns {Map}
 */
export const generate = async(args) => {
  const context = await validate(args);

  const generator = new Generator(
    context,
    new ReadFileCommand(),
    new GenerateDataCommand(),
    new OutputCommand()
  );
  await generator.exec();

  return generator.getGeneratedDataObject();
};