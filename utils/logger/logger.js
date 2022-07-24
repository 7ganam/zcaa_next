import chalk from "chalk";

const error = chalk.bold.red;
const warning = chalk.hex("#FFA500"); // Orange color
const info = chalk.hex("#0004FF"); // Orange color

// eslint-disable-next-line no-console
const log = console.log;
chalk.level = 1;

const logger = {
  error: (text) => log(error("ERROR: "), error(text)),
  warning: (text) => log(warning("WARNING: "), warning(text)),
  info: (text) => log(info("INFO: "), info(text)),
};

export default logger;
