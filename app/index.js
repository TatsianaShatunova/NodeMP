'use strict';

require("babel-core/register");
require("babel-polyfill");

const config = require('../config/config');
const models = require('./models');
const services = require('./services');
const streams = require('../utils/streams');

console.log(config.appName);
new models.User();
new models.Product();


var watcher = new services.dirWatcher();
var listener = new services.importer(watcher.changedEmitter, config.directoryToImport);
watcher.watch(config.directoryToWatch, 10);
streams.streamsActions("data.MOCK_DATA.csv", "io", "assets/bundle.css");



