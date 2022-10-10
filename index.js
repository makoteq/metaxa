#!/usr/bin/env node
import * as fs from "fs";
import show from "./lib/banner.js";
import projector from "./lib/engine.js";
import path from "path";
import chalk from "chalk";
let args = process.argv.slice(2);

const usage = `
${chalk.yellowBright.bold("Command: ")}
  ${chalk.green("start")} ${chalk.cyan("<file_path> [<delay>]")} : "Show text from file in <file_path> with delay between words in <delay>" ${chalk.cyan("(default 500ms)")}

${chalk.yellowBright.bold("Argument Details: ")}
  ${chalk.green("file_path")} : full or absolute path of file [mandatory*]
  ${chalk.green("delay")} : delay between two words in milliseconds

${chalk.yellowBright.bold("Options: ")}
  ${chalk.green("-h, --help")} : show help
  ${chalk.green("-v, --version")} : show version
`

switch (args[0]) {
  default:
    show("METAXA", "Run - metaxa start <path> to begin reading\nIf you want to know more, explore help section by\nmetaxa -h or metaxa --help");

    break;
  case "-help":
  case "-h":
    console.log(usage);
    break;
  case "-version":
  case "-v":
    let rawdata = fs.readFileSync('./package.json');
    let pjson = JSON.parse(rawdata);
    console.log(pjson.version);
    break
  case "start":
    if (args[1] && path.extname(args[1]) == ".txt") {
      fs.readFile(args[1], "utf8", function (err, data) {
        if (err) {
          console.log(chalk.white.bgRed.bold("\nSomething went wrong..."))
          console.log(`\n${chalk.yellowBright.bold('Error')}: ${chalk.red(err.message)}`);
          return;
        }
        projector(
          data,
          args[2] != undefined && Number.isInteger(Number(args[2]))
            ? args[2]
            : 500
        );
      });
    } else console.log(`\n${chalk.yellowBright.bold('Error')}: ${chalk.red("You need to specify proper path")}`);

    break;
}
