import fs from 'fs';

import {
  DEFAULT_NUMBER_OF_ARRAY_DATA,
  MAX_NUMBER_OF_ARRAY_DATA
} from '../const/index.js';
import { Logger } from '../logger/index.js';

/**
 * @typedef {Object} ValidatedValues
 * @property {string} inputPath - openapi yaml file path
 * @property {string} outputPath - output file path
 * @property {boolean} stateless - wheater if stateless or not
 * @property {number} numberOfData - the number of test data. default: 3
 * @property {Array<string>} ignoreList - The list of not output files
 * @property {string} extension - output file extension
 * @property {boolean} exampleSuffix - wheater if need for exampleSuffix
 *
 * @param {*} args
 * @returns {Promise<ValidatedValues>} validated values
 */
export const validate = async(args) => {
  const inputPath = args.input;
  const ai = args['ai'] == 'true' ? true : false; // default: false
  let stateless = args['stateless'] == 'false' || ai ? false : true; // default: true. if ai mode is true then stateless mode is false
  const outputPath =
    args.output.slice(-1) === '/' ? args.output.slice(0, -1) : args.output;
  const numberOfData = args['numberOfArrayData'] ?
    args['numberOfArrayData'] :
    DEFAULT_NUMBER_OF_ARRAY_DATA;

  if (numberOfData < 1 || numberOfData > MAX_NUMBER_OF_ARRAY_DATA) {
    throw new Error(
      `Unexpected number of array test data! 0 < numberOfData < ${MAX_NUMBER_OF_ARRAY_DATA}`
    );
  }
  if (numberOfData > 10 && ai) {
    throw new Error(
      `When using ai mode, it is not possible to create more than 10 data`
    );
  }
  const ignoreList = args.ignore ?
    args.ignore.replaceAll(' ', '').split(',') :
    [];
  const avoidAIGenerateList = args.avoidAi ?
    args.avoidAi.replaceAll(' ', '').split(',') :
    [];
  const extension = args['extension'] ? args['extension'] : '.ts';
  const exampleSuffix =
    args['exampleSuffix'] === undefined || args['exampleSuffix'] === 'true'; // default: true
  if (extension !== '.js' && extension !== '.ts') {
    throw new Error('Unexpected extension!');
  }

  if (!(await fs.existsSync(inputPath.replaceAll(' ', '')))) {
    Logger.info(`${inputPath}: No such file or directory`);
    exit(1);
  }

  if (!(await fs.existsSync(outputPath.replaceAll(' ', '')))) {
    Logger.info(`${outputPath}: No such file or directory`);
    exit(1);
  }
  return {
    inputPath,
    ai,
    outputPath,
    stateless,
    numberOfData,
    ignoreList,
    extension,
    exampleSuffix,
    avoidAIGenerateList
  };
};