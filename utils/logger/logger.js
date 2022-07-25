import chalk from "chalk";

const error = chalk.bold.red;
const warning = chalk.hex("#FFA500"); // Orange color
const info = chalk.hex("#0004FF"); // Orange color

// eslint-disable-next-line no-console
const log = console.log;
chalk.level = 1;

const logger = {
  error: (...input) => log(error("ERROR: "), error(...input)),
  warning: (...input) => log(warning("WARNING: "), warning(...input)),
  info: (...input) => log(info("INFO: "), info(...input)),
};

export default logger;
