#!/usr/bin/env node

var automax = require('./automax')({});
var fs = require('fs');
var _ = require('lodash');
var path = require('path');

//Loop through plugins directory
_.chain(fs.readdirSync(path.join(__dirname, 'plugins')))
  .filter(function(file){
    return /.+\.js/.exec(file);
  })
  .map(function(file){
    return file.replace('.js', '');
  })
  .each(function(plugin){
    automax.addPlugin(_.kebabCase(plugin), path.join(__dirname, 'plugins', plugin));
  })
  .value();


automax.start();



