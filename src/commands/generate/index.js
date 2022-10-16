import { parse, createSchemas } from "./parse.js";
import path from "path";
import fs from "fs";
import { createFileBySampleData } from "./output.js";
import { createSampleDataJson } from "./data.js";
import chalk from "chalk";

export const generate = async(args) => {
  const inputPath = args.input;
  const outputPath =
    args.output.slice(-1) === "/" ? args.output.slice(0, -1) : args.output;
  if (!(await fs.existsSync(inputPath))) {
    console.log(chalk.red.bold(`${inputPath}: No such file or directory`));
    return null;
  }
  if (!(await fs.existsSync(outputPath))) {
    console.log(chalk.red.bold(`${outputPath}: No such file or directory`));
    return null;
  }
  const yaml = await parse(path.resolve(process.cwd(), inputPath));
  if (yaml === null) process.exit(1);

  const schemas = createSchemas(yaml);
  if (schemas === null) process.exit(1);

  const sampleData = new Map();
  schemas.forEach((s) => {
    const name = s.replaceAll(".yaml", "");
    sampleData.set(name, createSampleDataJson(yaml.components.schemas, name));
  });

  sampleData.forEach((v, k) => {
    createFileBySampleData(k, v, outputPath);
  });
  return sampleData
};