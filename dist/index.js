'use strict';

require("babel-core/register");
require("babel-polyfill");

var config = require('./../config/config');
var models = require('./models');
// var Dirwatcher = require('./dirwatcher/dirwatcher');

console.log(config)

console.log(config.appName);
new models.User();
new models.Product();

// var x = new Dirwatcher();
// x.watch(config.directoryToWatch, 123);