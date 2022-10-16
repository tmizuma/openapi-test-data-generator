#! /usr/bin/env node

import { program } from "commander";
import { generate } from "./src/commands/generate/index.js";

program
  .command("generate")
  .description(
    "outputs test data from the OpenApi schema file to the folder specified by the argument."
  )
  .requiredOption("-i, --input <path>")
  .requiredOption("-o, --output <path>")
  .option("-n, --number-of-array-data <number>")
  .option("-ext, --extension <export file extension>")
  .action(generate);

program.parse(process.argv);