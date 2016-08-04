#!/usr/bin/env node
require("babel-core/register");
var automax = require('./automax')({});
var fs = require('fs');
var _ = require('lodash');
var path = require('path');

// Loop through plugins directory
_.chain(fs.readdirSync(path.join(__dirname, 'plugins')))
  .filter(fileName => /.+\.js/.exec(fileName))
  .map(file => file.replace('.js', ''))
  .each(plugin => automax.addPlugin(_.kebabCase(plugin), path.join(__dirname, 'plugins', plugin)))
  .value();


automax.start();



