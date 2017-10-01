'use strict';
 const fs = require('fs');
 const csv = require('parse-csv');
 const models = require('../models');

class Importer {
    _changedEmitter;
    _directory;
    constructor(changeEmitter, directory) {
        console.log("Importer Module");
        this._changedEmitter = changeEmitter;
        this._directory = directory;
        this._changedEmitter.on('dirwatcher:changed',  files => {
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

    import(files){
        console.log(`start async files import`);
        var products = [];
        var error;

        return new Promise(function(resolve, reject){
            files.forEach(function(filename) {
                fs.readFile(`data/${filename}`, 'utf-8', (err, data) => {
                     if (err) { 
                         console.log(`${err}`); error = err; reject(error); }

                    var obj = csv.toJSON(data, {headers: {included: true}});
                    obj.forEach(function(o) {
                        var product = new models.Product(o.id, o.name, o.brand, o.company, o.price, o.isbn);  
                        products.push(product);
                    }); 
                     resolve(products); 
                })
            });            
          });       
    }

     importSync(files){
      console.log(`start sync files import`);
      var products = [];

      files.forEach(function(filename) {
        var fileContent =  fs.readFileSync(`data/${filename}`, 'utf-8'); 
            // parse to json format
            var obj = csv.toJSON(fileContent, {headers: {included: true}});
            obj.forEach(function(o) {
                var product = new models.Product(o.id, o.name, o.brand, o.company, o.price, o.isbn);  
                products.push(product);
            });           
        }); 
        return products;
    }

}

module.exports = Importer;