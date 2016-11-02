#!/usr/bin/env node

require("babel-core/register");
const automax = require('./automax')({});
const fs = require('fs');
const _ = require('lodash');
const path = require('path');

// Loop through plugins directory
_.chain(fs.readdirSync(path.join(__dirname, 'plugins')))
  .filter(fileName => /.+\.js/.exec(fileName))
  .map(file => file.replace('.js', ''))
  .each(plugin => automax.addPlugin(_.kebabCase(plugin), path.join(__dirname, 'plugins', plugin)))
  .value();


module.exports = automax;



