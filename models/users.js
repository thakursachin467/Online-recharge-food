var mongoose = require('mongoose');
var items= require('./items');
var carts= require('./cart');
var Schema = mongoose.Schema;
ObjectId=Schema.Types.ObjectId

var usersSchema = new Schema ({
  email : {
      type: String,
      require:true
  },
  firstname:{
    type:String
  },
  lastname:{
    type:String
  },
  password:{
      type:String,
      require:true
},
cart:{
  type: ObjectId,
  ref: 'cart'
},
isAdmin :{
  type: Boolean,
  default: false
},
date:{
  type:Date,
  default:Date.now,
  required:true
}

});

var users = mongoose.model('users',usersSchema);
module.exports = users;
