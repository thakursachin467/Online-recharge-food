var mongoose = require('mongoose');
var users= require('./users');
var items= require('./items');
var Schema = mongoose.Schema;
ObjectId=Schema.Types.ObjectId

var orderSchema = new Schema ({
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
  default: Date.now()

},
OrderId: {
  type: String
},
grandTotal: {
  type : Number
}

});


var order= mongoose.model('order',orderSchema);
module.exports = order;
