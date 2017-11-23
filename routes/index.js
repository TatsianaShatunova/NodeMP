
const jwt = require('jsonwebtoken');
const fs = require('fs');
const csv = require('parse-csv');
const models = require('../app/models');
const router = require("../app").router;
const passport = require('passport');
const strategy = require('passport-local').Strategy;
const facebookStrategy = require('passport-facebook').Strategy;
const middlewwear = require('../middlewares');
const dbModels = require('../models');
const mongoModels = require('../mongo/index.js'); 
const random = require("random-js")();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
//const mongoose = require('mongoose');

// Connection URL
//const url = 'mongodb://Tatsiana_Shatunova:1111@localhost:27017/admin';

router.get('/api/city', function (req, res) {

     var city = "";
    // MongoClient.connect(url, function(err, db) {
     var count = 0;

     //Task 4 homework 7
    // db.collection("cities").find({}).toArray(function(err, result) {
    //     if (err) throw err;
    //     count = result.length;
    //     var value = random.integer(1, count);
    //     city = result[value];
    //     res.write(JSON.stringify(city));
    //     res.end('');
    //     db.close();
    //   });
   
    // }); 
      
    //Task 6 homework 7
    mongoModels.modelCity.find(function(err, cities){
       if(err) return console.log(err);
       count = cities.length;
       var value = random.integer(1, count);
       city = cities[value];
       //console.log(cities);
       res.write(JSON.stringify(city))
    res.end('');
    });

    });

    // router.get('/', function (req, res) {
    //     res.json({ parsedQuery: req.body })
    // })
            
    router.get('/api/facebook', passport.authenticate('facebook', {session: false}), function(req, res){
        res.json({success});
    });
    
    // router.post('/api/authenticate', passport.authenticate('local', {session: false}), function(req, res){
    //     var tkn = "";
    //     // localTokens.forEach((o) => {
    //     //     if(o.id == req.body.login){
    //     //         tkn = o.token;
    //     //     }
    //     // });
    //     // res.json({token: tkn});
    //     var tkn = jwt.sign({
    //         sub: login,
    //         isActive: true
    //     }, 'sign', { expiresIn: '1h' });
    //     res.json({token: tkn});
    // });
    
    router.post('/api/auth', function (req, res) {
        if (req.body.login !== login || req.body.password !== password) {
            res.status(404).send({ code: 404, message: 'Not Found' });
        } else {
            var tkn = jwt.sign({
                sub: login,
                isActive: true
            }, 'sign', { expiresIn: '1h' });
            res.send({ code: 202, message: 'OK', data: { user: { username: login } }, token: tkn });
        }
    });
    
    function checkToken(req, res, next) {
        let tkn = req.headers['x-access-token'];
    
        if (tkn) {
            jwt.verify(tkn, 'sign', function (err, decoded) {
                if (err) {
                    res.json({ code: 404, message: 'Failed to authenticate token!' });
                } else {
                    next();
                }
            })
        } else {
            res.status(404).send({ code: 404, message: 'No token provided!' });
        }
    }
    
    router.get('/api/products', function (req, res) {
        
                var products = [];
                // var fileContent = fs.readFileSync('data/MOCK_DATA.csv', 'utf-8');
                // var obj = csv.toJSON(fileContent, { headers: { included: true } });

                // obj.forEach((o) => {
                //     var product = new models.Product(o.id, o.name, o.brand, o.company, o.price, o.isbn);
                //     products.push(product);
                // });

                dbModels.Product.findAll().then(results => {

                    results.forEach((o) => {
                    var prod = new models.Product(o.dataValues.id, o.dataValues.name, o.dataValues.brand, o.dataValues.company, o.dataValues.price);
                    products.push(prod);
                    });

                    res.write(JSON.stringify(products));
                    res.end();
                  });
                //next();
            });
    
    router.get('/api/products', checkToken, function (req, res) {
    
            var products = [];
            var fileContent = fs.readFileSync('data/MOCK_DATA.csv', 'utf-8');
            var obj = csv.toJSON(fileContent, { headers: { included: true } });
            obj.forEach((o) => {
                var product = new models.Product(o.id, o.name, o.brand, o.company, o.price, o.isbn);
                products.push(product);
            });
        
            res.write(JSON.stringify(products));
            res.end();
            //next();
        });
    
    // router.get('/api/products', checkToken, function (req, res) {
    
    //     console.log(req.parsedCookies);
    //     var products = [];
    //     var fileContent = fs.readFileSync('data/MOCK_DATA.csv', 'utf-8');
    //     var obj = csv.toJSON(fileContent, { headers: { included: true } });
    //     obj.forEach((o) => {
    //         var product = new models.Product(o.id, o.name, o.brand, o.company, o.price, o.isbn);
    //         products.push(product);
    //     });
    
    //     res.write(JSON.stringify(products));
    //     res.end();
    //     //next();
    // });
    
    router.get('/api/products/:id', function (req, res) {
    
        var product;
        // console.log(req.params.id);
        // var fileContent = fs.readFileSync('data/MOCK_DATA.csv', 'utf-8');
        // var obj = csv.toJSON(fileContent, { headers: { included: true } });
        // obj.forEach((o) => {
        //     if (o.id == req.params.id) {
        //         product = new models.Product(o.id, o.name, o.brand, o.company, o.price, o.isbn);
        //     }
        // });

        dbModels.Product.findById(req.params.id).then(result => {   
            product = new models.Product(result.id, result.name, result.brand, result.company, result.price);                               
            //console.log(product);
        });;
    
        res.write(JSON.stringify(product));
        res.end();
    });
    
    router.get('/api/products/:id/reviews', function (req, res) {
    
        // res.write(JSON.stringify());
        res.end('Dont know where to get reviews!!!');
        next();
    });
    
    // router.post('/api/products', function (req, res) {
    
    //     // res.write(JSON.stringify());
    //     res.end();
    //     next();
    // });
    
    const users = [{
        id: 1,
        name: 'Supreme T-Shirt',
        brand: 'Supreme',
        price: 99.99,
        options: [
            { color: 'blue' },
            { size: 'XL' }
        ]
    },
    {
        id: 2,
        name: 'Supreme',
        brand: 'Supreme',
        price: 87,
        options: [
            { color: 'blue' },
            { size: 'XL' }
        ]
    }]
    
    router.get('/api/users', checkToken, function (req, res) {
    
        var result = [];
        users.forEach((o) => {
            var user = new models.User(o.id, o.name, o.brand, o.price);
            result.push(user);
        });
        // res.write(JSON.stringify());
        res.write(JSON.stringify(result));
        res.end();
    });
    





