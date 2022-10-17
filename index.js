#! /usr/bin/env node

import { program } from "commander";
import { generate } from "./src/commands/generate/index.js";

program
  .command("generate")
  .description(
    "otdgen generates JavaScript/TypeScript test data from the OpenApi schema file(yaml) to the folder specified by the argument."
  )
  .requiredOption("-i, --input <path>")
  .requiredOption("-o, --output <path>")
  .option("-n, --number-of-array-data <number>")
  .option("-ext, --extension <output file extension>")
  .option("-ignore, --ignore <ignore schema list separated by commas>")
  .action(generate);

program.parse(process.argv);