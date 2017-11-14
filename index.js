'use strict';

const app = require("./app").app;
const middlewwear = require('./middlewares');
const routes = require('./routes');

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on port ${port}!`));

