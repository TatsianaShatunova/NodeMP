'use strict';

const express = require('express');
const app = express();
const router = express.Router();

app.use(express.json());


module.exports = {
    app: app,
    router: router
}