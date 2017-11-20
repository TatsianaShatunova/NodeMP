//const fs = require('fs');
//const path = require('path');
const Sequelize = require('sequelize');
//const basename = path.basename(module.filename);
//const env = process.env.NODE_ENV || 'development';
const config = require('../config/config');
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: 'localhost',
    dialect: 'postgres',
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  
    // SQLite only
    //storage: 'path/to/database.sqlite',
  
    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
  });
  


