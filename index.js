#!/usr/bin/env node
import { promises as fs } from "fs";
import path from "path";
import chalk from "chalk";
import show from "./lib/banner.js";
import projector from "./lib/engine.js";

const fileRead = async (fileName) => {
  const fileData = await fs.readFile(fileName, "utf8");
  return fileData;
};

(async () => {
  let [command, filename, delay] = process.argv.slice(2);

  const usage = `
  ${chalk.yellowBright.bold("Command: ")}
    ${chalk.green("start")} ${chalk.cyan(
    "<file_path> [<delay>]"
  )} : "Show text from file in <file_path> with delay between words in <delay>" ${chalk.cyan(
    "(default 500ms)"
  )}
  
  ${chalk.yellowBright.bold("Argument Details: ")}
    ${chalk.green(
      "file_path"
    )} : full or absolute path of file (only .txt supported) [mandatory*]
    ${chalk.green("delay")} : delay between two words in milliseconds
  
  ${chalk.yellowBright.bold("Options: ")}
    ${chalk.green("-h, --help")} : show help
    ${chalk.green("-v, --version")} : show version
  `;

  switch (command) {
    default:
      show(
        "METAXA",
        "Run - metaxa start <path> to begin reading\nIf you want to know more, explore help section by\nmetaxa -h or metaxa --help"
      );
      break;

    case "-help":
    case "-h":
      console.log(usage);
      break;

    case "-version":
    case "-v":
      let rawdata = await fileRead("./package.json");
      let pjson = JSON.parse(rawdata);
      console.log(pjson.version);
      break;

    case "start":
      if (filename && path.extname(filename) == ".txt") {
        try {
          const data = await fileRead(filename);
          projector(
            data,
            delay != undefined && Number.isInteger(Number(delay)) ? delay : 500
          );
        } catch (err) {
          console.log(chalk.white.bgRed.bold("\nSomething went wrong..."));
          console.log(
            `\n${chalk.yellowBright.bold("Error")}: ${chalk.red(err.message)}`
          );
        }
      } else
        console.log(
          `\n${chalk.yellowBright.bold("Error")}: ${chalk.red(
            "You need to specify proper path"
          )}`
        );

      break;
  }
})();
