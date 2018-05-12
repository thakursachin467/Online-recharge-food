var mongoose = require('mongoose');
var users= require('./users');
var items= require('./items');
var Schema = mongoose.Schema;
ObjectId=Schema.Types.ObjectId

var cartSchema = new Schema ({
users:{
  type:String
},
items:{
  type: ObjectId,
  ref:'item'
},
quantity:{
  type: Number
},
totalPrice:{
  type: Number
},
date :{
  type: Date,

},
OrderId: {
  type: String
},
OrderComplete:{
  type: Boolean
}

});

var cart= mongoose.model('cart',cartSchema);


module.exports = cart;
