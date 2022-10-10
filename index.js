import * as fs from "fs";
import show from "./lib/banner.js";
import projector from "./lib/engine.js";
import path from "path";
import chalk from "chalk";
let args = process.argv.slice(2);
const usage = `Options:
start <file> <delay>    start reading text from path specified in <file>,change time between words in <delay>    
`;

switch (args[0]) {
  default:
    show("METAXA", "type - metaxa start <path> to begin reading");

    break;
  case ("-help", "-h"):
    console.log(chalk.cyan(usage));
    break;
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
