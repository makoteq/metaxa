#!/usr/bin/env node
import * as fs from "fs";
import show from "./lib/banner.js";
import projector from "./lib/engine.js";
import path from "path";
import chalk from "chalk";
let args = process.argv.slice(2);

const usage = `
Command : 
  start <file_path> [<delay>]
    Show text from file in <file_path> with delay between words in <delay> (default 500ms)

Argument Details :
  file_path : full or absolute path of file [mandatory*]
  delay : delay between two words in milliseconds

Options :
  -h, --help : show help
  -v, --version : show version
`

switch (args[0]) {
  default:
    show("METAXA", "Run - metaxa start <path> to begin reading\nIf you want to know more, explore help section by\nmetaxa -h or metaxa --help");

    break;
  case "-help":
  case "-h":
    console.log(chalk.cyan(usage));
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
          throw err;
        }
        projector(
          data,
          args[2] != undefined && Number.isInteger(Number(args[2]))
            ? args[2]
            : 500
        );
      });
    } else console.log("You need to specify proper path");

    break;
}
