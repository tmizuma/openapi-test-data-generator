import { parse, createSchemas } from "./parse.js";
import path from "path";
import fs from "fs";
import { createFileBySampleData } from "./output.js";
import { createSampleDataJson } from "./data.js";
import { Logger } from "./logger.js";

const defaultNumberOfArrayData = 3;

/**
 * generate test data
 * @param {*} args
 * @returns {Map}
 */
export const generate = async (args) => {
  const inputPath = args.input;
  const outputPath =
    args.output.slice(-1) === "/" ? args.output.slice(0, -1) : args.output;
  const numberOfArrayTestData = args["numberOfArrayData"]
    ? args["numberOfArrayData"]
    : defaultNumberOfArrayData;
  const ignoreList = args.ignore
    ? args.ignore.replaceAll(" ", "").split(",")
    : [];
  const extension = args["extension"] === ".js" ? args["extension"] : ".ts";
  if (!(await fs.existsSync(inputPath))) {
    Logger.info(`${inputPath}: No such file or directory`);
    return null;
  }
  if (!(await fs.existsSync(outputPath))) {
    Logger.info(`${outputPath}: No such file or directory`);
    return null;
  }
  const yaml = await parse(path.resolve(process.cwd(), inputPath));
  if (yaml === null) process.exit(1);

  const schemas = createSchemas(yaml);
  if (schemas === null) {
    Logger.error("Unexpected yaml type");
    process.exit(1);
  }
  const sampleData = new Map();
  schemas.forEach((s) => {
    const name = s.replaceAll(".yaml", "");
    if (ignoreList.indexOf(name) === -1) {
      sampleData.set(
        name,
        createSampleDataJson(yaml.components.schemas, name, {
          n: numberOfArrayTestData,
        })
      );
    } else {
      Logger.warn(`[ignore] output: ==> ${outputPath}/${name}${extension}`);
    }
  });
  for (let [k, v] of sampleData) {
    await createFileBySampleData(k, v, outputPath, extension);
  }

  return sampleData;
};
