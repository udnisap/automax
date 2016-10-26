#!/usr/bin/env node

require("babel-core/register");
const automax = require('./automax')({});
const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const programe = require('commander');
const pkgJson = require('../package.json');

// Loop through plugins directory
_.chain(fs.readdirSync(path.join(__dirname, 'plugins')))
  .filter(fileName => /.+\.js/.exec(fileName))
  .map(file => file.replace('.js', ''))
  .each(plugin => automax.addPlugin(_.kebabCase(plugin), path.join(__dirname, 'plugins', plugin)))
  .value();

// programe
//   .version(pkgJson.version)
//   .option('-s, --script <file>', 'Run automax with the commands in the script file rather than the interactive mode')
//   .option('-p, --plugin [dir]', 'Plugin directory to preload automax', 'plguins')
//   .parse(process.argv);
//
// programe.
module.exports = automax.start();



