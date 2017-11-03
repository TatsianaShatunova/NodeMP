'use strict';

const cookieParser = require('cookie-parser')

const app = require("./app");
//import app from './app.js';
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on port ${port}!`))
app.use(cookieParser());

app.get('/', function(req, res){

   // req.app.locals.parsedCookies = req.cookies;
    res.json({parsedCookies: req.cookies})
    next();
})

app.get('/', function(req, res){
    
    //req.app.locals.parsedCookies = req.body;
    res.json({parsedQuery: req.body})
})