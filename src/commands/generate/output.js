import chalk from "chalk";
import ejs from "ejs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const capitalize = (str) => {
  if (typeof str !== "string" || !str) return str;
  return str.charAt(0).toLowerCase() + str.slice(1);
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createFileBySampleData = async (name, properties, outputPath) => {
  const fileName = `${name}.ts`;
  const code = ejs.render(
    fs.readFileSync(
      path.resolve(process.cwd(), `${__dirname}/template/test_data.ejs`),
      "utf-8"
    ),
    {
      name: capitalize(name),
      properties,
    }
  );
  fs.writeFile(`${outputPath}/${fileName}`, code, "utf8", (err) => {
    if (err) {
      console.log(
        chalk.red.bold(
          `[ERROR]: ==> failed to output ${outputPath}/${fileName}`
        )
      );
    } else {
      console.log(chalk.green.bold(`output: ==> ${outputPath}/${fileName}`));
    }
  });
};
