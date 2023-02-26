import chalk from 'chalk';
export const Logger = {
  syslog: (msg) => {
    if (process.env.NODE_ENV === 'test') return;
    console.log(chalk.gray.bold(msg));
  },
  info: (msg) => {
    if (process.env.NODE_ENV === 'test') return;
    console.log(chalk.green.bold(msg));
  },
  warn: (msg) => {
    if (process.env.NODE_ENV === 'test') return;
    console.log(chalk.yellow.bold(msg));
  },
  error: (msg) => {
    if (process.env.NODE_ENV === 'test') return;
    console.log(chalk.red.bold(msg));
  }
};