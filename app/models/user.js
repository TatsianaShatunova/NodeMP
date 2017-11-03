'use strict';

class User {

    constructor(id = null, name = null, brand = 'def', price = null) {
        this._id = id;
        this._name = name;
        this._brand = brand;
        this._price = price;
       // console.log("User Module");
    }
}

module.exports = User;

