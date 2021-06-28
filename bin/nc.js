#!/usr/bin/env node
const { program } = require('commander');
const chalk = require('chalk');

// 脚手架相关信息输出
program
  .version('1.0.0', '-v, -version')
  .command('start <name> [options]')
  .description('nine cat h5 cli start')
  .action((name, startOptions, cmd) => {
    if(cmd.extra) {
      console.log(chalk.yellow('cmd.extras value is '+ cmd.extra));
    } else {
      console.log('no cmd.extra');
    }
    if(startOptions.length > 0) {
      console.log(startOptions);
    }
  });

program.parse(process.argv);

console.log(chalk.red, '---------------');