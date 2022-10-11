import chalk from "chalk";

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
  tape.unshift(
    `${chalk.yellow.bold("countdown")}: 3`,
    `${chalk.yellow.bold("countdown")}: 2`,
    `${chalk.yellow.bold("countdown")}: 1`,
    `${chalk.green.bold("Go!")}`
  );

  // regular for loop is approx 10 times faster than a foreach loop
  for (let i = 0; i < tape.length; i++) {
    setTimeout(function () {
      console.clear();
      i > 3
        ? console.log(chalk.yellow.bold("word: "), chalk.cyan(tape[i]))
        : console.log(tape[i]);
    }, i * delay);
  }
}
