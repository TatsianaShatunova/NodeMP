'use strict';

require("babel-core/register");
require("babel-polyfill");

const config = require('../config/config');
const models = require('./models');
const services = require('./services');

console.log(config.appName);
new models.User();
new models.Product();


var watcher = new services.DirWatcher();
watcher.watch(config.directoryToWatch, 10);



