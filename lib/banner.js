import figlet from "figlet";
import chalk from "chalk";

export default function show(text, before) {
  figlet(text, function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(chalk.blue(data));
    if (before) console.log(chalk.cyan(before));
  });
}
