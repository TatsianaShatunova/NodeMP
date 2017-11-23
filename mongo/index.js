const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

 //mongoose.connect('mongodb://localhost/my_database');
 mongoose.connect('mongodb://Tatsiana_Shatunova:1111@localhost:27017/admin');

 var city = mongoose.Schema({
    name: { type: String, unique: true},
    country: { type: String },
    capital: { type: Boolean, required: true },
    location: {
        lat: {type: Number},
        long: {type: Number} 
      }
  },
  {
    timestamps: true
  });
  city.plugin(uniqueValidator);

  var cityModel = mongoose.model('cityModel', city);  

  //cityModel.collection.remove()

  //already added to db will raise validation error
  // var brest = new cityModel({name: "Minsk",country: "Belarus",capital: true,location: {lat:74.097621,long: 43.734050}});
  // var minsk = new cityModel({name: "Brest",country: "Belarus",capital: false,location: {lat:84.097621,long: 25.734050}});
  // var vitebsk = new cityModel({name: "Vitebsk",country: "Belarus",capital: false,location: {lat:19.097621,long: 65.734050}});
  // var grodno = new cityModel({name: "Grodno",country: "Belarus",capital: false,location: {lat:10.097621,long: 95.734050}});
  // minsk.save(function(err, res){
  //   if(err) return console.log(err);
  // });
  // vitebsk.save(function(err, res){
  //   if(err) return console.log(err);
  // });
  // brest.save(function(err, res){
  //   if(err) return console.log(err);
  // });
  // grodno.save(function(err, res){
  //   if(err) return console.log(err);
  // });


  var productSchema = mongoose.Schema({
    name: { type: String, unique: true},
    brand: { type: String },
    company: { type: String},
    price: { type: String, required: true },
    isbn: { type: String},
  });
  productSchema.plugin(uniqueValidator);

  var productModel = mongoose.model('product', productSchema);  

  module.exports = {
    modelCity: cityModel,
    modelProduct: productModel
  }
