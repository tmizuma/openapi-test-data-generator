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

export const createFileBySampleData = async (
  name,
  properties,
  outputPath,
  extension
) => {
  const fileName = `${name}${extension}`;
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
  try {
    await fs.promises.writeFile(`${outputPath}/${fileName}`, code, "utf8");
    console.log(chalk.green.bold(`output: ==> ${outputPath}/${fileName}`));
  } catch (e) {
    console.log(
      chalk.red.bold(`[ERROR]: ==> failed to output ${outputPath}/${fileName}`)
    );
  }
};
