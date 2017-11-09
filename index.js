'use strict';

const cookieParser = require('cookie-parser')

const fs = require('fs');
const csv = require('parse-csv');
const models = require('./app/models');
const app = require("./app").app;
const router = require("./app").router;

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on port ${port}!`));

// here is the middleware pipeline
app
    .use((req, res, next) => {
        // emulate cookie
        req.headers.cookie = 'field1=4355232654;field2=654376575;field3=KYUFQEFFBQ'
        next();
    })
    .use(cookieParser())
    // example with an in-line handler
    .use((req, res, next) => {
        // TODO: here you should replce [req.cookies] on [req.parsedCookies]
        req.parsedCookies = req.cookies;
        next();
    })
    // example with a stand-alone handler 
    .use(setParsedQuery)
    .use('/', router);


function setParsedQuery(req, res, next) {
    // TODO: here you should set [req.parsedQuery]
    req.parsedQuery = req.body;
    next();
}

// router.get('/', function (req, res) {
//     res.json({ parsedQuery: req.body })
// })

router.get('/api/products', function (req, res) {

    console.log(req.parsedCookies);
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

router.get('/api/products/:id', function (req, res) {

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

router.get('/api/products/:id/reviews', function (req, res) {

    // res.write(JSON.stringify());
    res.end('Dont know where to get reviews!!!');
    next();
});

router.post('/api/products', function (req, res) {

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

router.get('/api/users', function (req, res) {

    var result = [];
    users.forEach((o) => {
        var user = new models.User(o.id, o.name, o.brand, o.price);
        result.push(user);
    });
    // res.write(JSON.stringify());
    res.write(JSON.stringify(result));
    res.end();
});
