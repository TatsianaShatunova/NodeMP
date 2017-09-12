'use strict';

const config = require('./config/config');
const models = require('./models');

console.log(config.AppName);
new models.User();
new models.Product();





