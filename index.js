'use strict';

const cookieParser = require('cookie-parser')

const fs = require('fs');
const csv = require('parse-csv');
const models = require('./app/models');
const app = require("./app");

const port = process.env.PORT || 3000;

app.app.listen(port, () => console.log(`App listening on port ${port}!`))
app.app.use(cookieParser());

app.app.get('/', function (req, res) {

    // req.app.locals.parsedCookies = req.cookies;
    res.json({ parsedCookies: req.cookies })
    next();
})

app.app.get('/', function (req, res) {

    //req.app.locals.parsedCookies = req.body;
    res.json({ parsedQuery: req.body })
})

app.router.get('/api/products', function (req, res) {

    var products = [];
    var fileContent = fs.readFileSync('data/MOCK_DATA.csv', 'utf-8');
    var obj = csv.toJSON(fileContent, { headers: { included: true } });
    obj.forEach((o) => {
        var product = new models.Product(o.id, o.name, o.brand, o.company, o.price, o.isbn);
        products.push(product);
    });

    res.write(JSON.stringify(products));
    res.end();
    next();
});

app.router.get('/api/products/:id', function (req, res) {

    var product;
    console.log(req.params.id);
    var fileContent = fs.readFileSync('data/MOCK_DATA.csv', 'utf-8');
    var obj = csv.toJSON(fileContent, { headers: { included: true } });
    obj.forEach((o) => {
        if (o.id == req.params.id) {
            product = new models.Product(o.id, o.name, o.brand, o.company, o.price, o.isbn);
        }
    });

    res.write(JSON.stringify(product));
    res.end();
    next();
});

app.router.get('/api/products/:id/reviews', function (req, res) {

    // res.write(JSON.stringify());
    res.end('Dont know where to get reviews!!!');
    next();
});

app.router.post('/api/products', function (req, res) {

    // res.write(JSON.stringify());
    res.end();
    next();
});

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

app.router.get('/api/users', function (req, res) {

    var result = [];
    users.forEach((o) => {
        var user = new models.User(o.id, o.name, o.brand, o.price);
        result.push(user);
    });
    // res.write(JSON.stringify());
    res.write(JSON.stringify(result));
    res.end();
});


app.app.use('/', app.router);