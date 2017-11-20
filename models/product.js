'use strict';
 module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    company: DataTypes.STRING,
    price: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Product.hasMany(models.Task);
      }
    }
  });
  return Product;
};