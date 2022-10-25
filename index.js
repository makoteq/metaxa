#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';
import chalk from 'chalk';
import show from './lib/banner.js';
import projector from './lib/engine.js';

const fileRead = async (fileName) => {
  const fileData = await fs.readFile(fileName, 'utf8');
  return fileData;
};

// Function to return the words of the data provided.
const fileWords = async (data) => {
  const words = data.split(' ').length;
  console.log(
    `${chalk.yellowBright.bold('Number of words: ')}` + `${chalk.green(words)}`
  );
};

// Function to return the sentences of the data provided.
const fileSentences = async (data) => {
  const sentences = data.match(/[\w|\)][.?!](\s|$)/g).length;
  console.log(
    `${chalk.yellowBright.bold('Number of sentences: ')}` +
      `${chalk.green(sentences)}`
  );
};
(async () => {
  let [command, filename, delay] = process.argv.slice(2);
  const usage = `${chalk.yellowBright.bold('Commands: ')}
  ${chalk.green('start')} ${chalk.cyan(
    '<file_path> [<delay>]'
  )} : "Show text from file in ${chalk.cyan(
    '<file_path>'
  )} with delay between words in ${chalk.cyan('<delay>')}" ${chalk.cyan(
    '(default 250WPM)'
  )}
  ${chalk.green('stats')} ${chalk.cyan(
    '<file_path>'
  )} : "Show number of words, sentences, and absolute path of file in ${chalk.cyan(
    '<file_path>'
  )}"
  ${chalk.green('read')} ${chalk.cyan(
    '<text> [<delay>]'
  )} : "Show text from text wrapped with '' or "" in ${chalk.cyan(
    '<text>'
  )}, with delay between words in ${chalk.cyan('<delay>')}" ${chalk.cyan(
    '(default 250WPM)'
  )}
${chalk.yellowBright.bold('Argument Details: ')}
  ${chalk.green(
    'file_path'
  )} : full or absolute path of file (only .txt supported) [mandatory*]
  ${chalk.green('delay')} : delay between two words in WPM
${chalk.yellowBright.bold('Options: ')}
  ${chalk.green('-h, --help')} : show help
  ${chalk.green('-v, --version')} : show version
  `;

  switch (command) {
    default:
      show('METAXA', usage);
      break;

    case '-help':
    case '-h':
      console.log(usage);
      break;

    case '-version':
    case '-v':
      let rawdata = await fileRead('./package.json');
      let pjson = JSON.parse(rawdata);
      console.log(pjson.version);
      break;

    case 'start':
      if (filename && path.extname(filename) == '.txt') {
        try {
          const data = await fileRead(filename);
          projector(
            data,
            delay != undefined && Number.isInteger(Number(delay))
              ? 60000 / delay
              : 60000 / 250
          );
        } catch (err) {
          console.log(chalk.white.bgRed.bold('\nSomething went wrong...'));
          console.log(
            `\n${chalk.yellowBright.bold('Error')}: ${chalk.red(err.message)}`
          );
        }
      } else
        console.log(
          `\n${chalk.yellowBright.bold('Error')}: ${chalk.red(
            'You need to specify proper path'
          )}`
        );
      break;

    case 'read':
      try {
        const data = filename;
        projector(
          data,
          delay != undefined && Number.isInteger(Number(delay))
            ? 60000 / delay
            : 60000 / 250
        );
      } catch (err) {
        console.log(chalk.white.bgRed.bold('\nSomething went wrong...'));
        console.log(
          `\n${chalk.yellowBright.bold('Error')}: ${chalk.red(err.message)}`
        );
      }

      break;

    case 'stats':
      if (filename && path.extname(filename) == '.txt') {
        try {
          const data = await fileRead(filename);
          // Call functions to read number of words and sentences.
          fileWords(data);
          fileSentences(data);
          // Get and display the absolute path of file.
          console.log(
            `${chalk.blueBright.bold(
              'The absolute path is: ' + path.resolve(filename)
            )}`
          );
        } catch (err) {
          console.log(chalk.white.bgRed.bold('\nSomething went wrong...'));
          console.log(
            `\n${chalk.yellowBright.bold('Error')}: ${chalk.red(err.message)}`
          );
        }
      } else
        console.log(
          `\n${chalk.yellowBright.bold('Error')}: ${chalk.red(
            'You need to specify proper path'
          )}`
        );
      break;
  }
})();
