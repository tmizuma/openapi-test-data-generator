import { parse, createSchemas } from "./parse.js";
import path from "path";
import { exportFileBySampleData } from "./output.js";
import { createSampleDataJson } from "./generator/sampledata.js";
import { Logger } from "./logger/index.js";
import { validate } from "./validator/index.js";

/**
 * generate test data
 * @param {*} args
 * @returns {Map}
 */
export const generate = async (args) => {
  const {
    inputPath,
    outputPath,
    stateless,
    numberOfArrayTestData,
    ignoreList,
    extension,
  } = await validate(args);

  const yaml = await parse(path.resolve(process.cwd(), inputPath));
  if (yaml === null) {
    Logger.error(`Unexpected yaml parse error occured!`);
    process.exit(1);
  }
  const schemas = createSchemas(yaml);
  if (schemas === null) {
    Logger.error("Unexpected yaml type. Schemas does not exists.");
    process.exit(1);
  }
  const sampleDataMap = new Map();
  schemas.forEach((s) => {
    const name = s.replaceAll(".yaml", "");
    if (ignoreList.indexOf(name) === -1) {
      sampleDataMap.set(
        name,
        createSampleDataJson(yaml.components.schemas, name, {
          n: numberOfArrayTestData,
          stateless,
        })
      );
    } else {
      Logger.warn(`[ignore] output: ==> ${outputPath}/${name}${extension}`);
    }
  });
  for (let [k, v] of sampleDataMap) {
    await exportFileBySampleData(k, v, outputPath, extension);
  }
  return sampleDataMap;
};
