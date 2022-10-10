import chalk from 'chalk';

export default function projector(text, delay) {
  let tape = text
    .split(";")
    .join("")
    .split(",")
    .join("")
    .split(".")
    .join("")
    .split(/\r\n/g)
    .join(" ")
    .split(" ");
  tape.unshift(`${chalk.yellow.bold("countdown")}: 3`,
    `${chalk.yellow.bold("countdown")}: 2`,
    `${chalk.yellow.bold("countdown")}: 1`,
    `${chalk.green.bold("Go!")}`);

  tape.forEach((item, i) => {
    setTimeout(function () {
      console.clear();
      i > 3 ?
        console.log(chalk.yellow.bold("word: "), chalk.cyan(item)) :
        console.log(item);
    }, i * delay);
  });
}
