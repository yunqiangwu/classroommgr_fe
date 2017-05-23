// https://github.com/shelljs/shelljs
require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var path = require('path')
var chalk = require('chalk')
var shell = require('shelljs')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig1 = require('./webpack.prod.conf')
var webpackConfig2 = require('./student/webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start()

var spinner2 = ora('building for production... student')
spinner2.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
var templatePath = path.join(config.build.assetsRoot,'templates');
shell.rm('-rf', assetsPath)
shell.mkdir('-p', assetsPath)
shell.rm('-rf', templatePath)
shell.mkdir('-p',templatePath)
shell.config.silent = true
shell.cp('-R', 'static/*', assetsPath)
shell.config.silent = false

webpack(webpackConfig1, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
})




webpack(webpackConfig2, function (err, stats) {
  spinner2.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
})
