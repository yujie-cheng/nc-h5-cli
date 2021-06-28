#!/usr/bin/env node
// const inquirer = require('inquirer')
// const path = require('path')
// const fs = require('fs')
// const ejs = require('ejs')
// const chalk = require('chalk');
import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';
import ejs from 'ejs';
import chalk from 'chalk';
import ora from 'ora';
import logSymbols from 'log-symbols';

// 命令行询问
inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'project name?',
    default: 'nc-demo'
  }
])
  .then(answers => {
    try {
      const spinner = ora('项目初始化中').start();
      spinner.color = 'yellow';
      spinner.text = '脚手架初始化中';
      setTimeout(() => {
        changeFile(answers);
        spinner.stop();
      }, 1000);
      
    } catch(err) {
      console.log(logSymbols.error+ err +' nc-cli初始化失败，请重试');
    }
  })
  .catch(error => {
    if (error.isTtyError) {
      console.log('prompt could not be renchered in current env')
    } else {
      console.log(logSymbols.error + "nc-cli初始化失败！");
    }
  })

  function changeFile (answers) {
    // throw new Error('未知错误');
    const cwdUrl = process.cwd();
    // 模版文件目录
    const destUrl = path.join(cwdUrl, 'templates'); 
    // dist文件目录
    const distUrl = path.join(cwdUrl, 'dist'); 
    // 删除dist
    // 判断dist文件是否存在
    if (fs.existsSync(distUrl)) {
      let files = fs.readdirSync(distUrl)
      files.forEach(function (file, index) {
        const curPath = path.join(distUrl, file);
        fs.unlinkSync(curPath);
      });
      /**
       * 清除文件夹
       */
      fs.rmdirSync(distUrl);
      console.log(logSymbols.success, chalk.red('删除') + "dist文件成功!")
    }
    // 生成文件目录
    // process.cwd() 对应控制台所在目录
    fs.mkdirSync('./dist')
    // 从模版目录中读取文件
    fs.readdir(destUrl, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        // 使用 ejs 渲染对应的模版文件
        // renderFile（模版文件地址，传入渲染数据）
        ejs.renderFile(path.join(destUrl, file), answers).then(data => {
          // 生成 ejs 处理后的模版文件
          fs.writeFileSync(path.join('/Users/yunshui/Desktop/nc-h5-cli/dist', file) , data)
        })
      })
    console.log(logSymbols.success, "项目" + chalk.bgMagenta('写入') + "dist成功！")
    })
  }