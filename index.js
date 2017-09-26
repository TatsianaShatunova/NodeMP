'use strict';

const config = require('./config/config');
const models = require('./models');

console.log(config.appName);
new models.User();
new models.Product();





