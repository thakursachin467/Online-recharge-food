var mongoose = require('mongoose');
var users= require('./users');
var items= require('./items');
var Schema = mongoose.Schema;
ObjectId=Schema.Types.ObjectId

var cartSchema = new Schema ({
users:{
  type:ObjectId,
  ref:'users'
},
items:{
  type:ObjectId,
  ref:'items'
}

});

var cart= mongoose.model('cart',cartSchema);

module.exports = cart;
