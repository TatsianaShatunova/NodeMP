'use strict';

const express = require('express');
const app = express();
const router = express.Router();

app.use(express.json());

console.log('start app');


module.exports = {
    app: app,
    router: router
}



