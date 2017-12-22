'use strict';
const fs = require('fs');
const csv = require('parse-csv');
const models = require('../models');
const dbModels = require('../../models');
const mongoModels = require('../../mongo/index.js'); 

class Importer {
    _changedEmitter;
    _directory;

    constructor(changeEmitter, directory) {
        console.log("Importer Module");
        this._changedEmitter = changeEmitter;
        this._directory = directory;
        this._changedEmitter.on('dirwatcher:changed', files => {
            this.import(files).then(function (content) {
                console.log(`async import products count: ${content.length}`);
            })
                .catch(function (error) {
                    console.error('An error occurred', error);
                });
            var products = this.importSync(files);
            console.log(`Sync method imported ${products.length} products`);
        });
    }

    import(files) {
        console.log(`start async files import`);

        return new Promise( (resolve, reject) => {
            try {
                var products = this.importSync(files);
                resolve(products);
            } catch (er) {
                reject(er);
            }
        });
    }

    importSync(files) {
        const that = this;
        console.log(`start sync files import`);
        var products = [];

        files.forEach(function (filename) {
            var fileContent = fs.readFileSync(filename, 'utf-8');
            products = that.parseProduct(fileContent);
        });
        return products;
    }

    parseProduct(rowProduct) {

        var products = []
        var obj = csv.toJSON(rowProduct, { headers: { included: true } });
        obj.forEach((o) => {
            var product = new models.Product(o.id, o.name, o.brand, o.company, o.price, o.isbn);

        //For postgres bd
        //   var ndbProd = dbModels.Product.create({
        //         name: o.name,
        //         brand: o.brand,
        //         company: o.company,
        //         price: o.price
        //     });

        //For mongodb       
        var newProduct = new  mongoModels.modelProduct({name: o.name,brand: o.brand,company: o.company,price: o.price,isbn: o.isbn});
        newProduct.save(function(err, res){
          if(err) return console.log(err);
        });

            products.push(product);
        });
        return products;
    }
}

module.exports = Importer;