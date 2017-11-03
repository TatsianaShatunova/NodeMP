'use strict';

class Product {
    // _id;
    // _name;
    // _brand;
    // _company;
    // _price;
    // _isbn;

    constructor(id = null, name = null, brand = 'def', company = null, price = null, isbn = null) {
        this._id = id;
        this._name = name;
        this._brand = brand;
        this._company = company;
        this._price = price;
        this._isbn = isbn;
       // console.log("Product Module");
    }

    toString () {
        return `Product ${this._id} | ${this._name}, ${this.brand}, ${this._company}, ${this._price}, ${this._isbn}`
    }
}

module.exports = Product;