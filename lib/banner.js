import figlet from 'figlet';
import chalk from 'chalk';

export default function show(text, before) {
  figlet(text, function (err, data) {
    if (err) {
      console.log(chalk.white.bgRed.bold('\nSomething went wrong...\n'));
      console.dir(err);
      return;
    }
    console.log(chalk.blue(data));
    if (before) console.log(before);
  });
}
