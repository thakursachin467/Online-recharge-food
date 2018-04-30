var mongoose = require('mongoose');
var items= require('./items');
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
items:{
  type:ObjectId,
  ref:'items'
},
isAdmin :{
  type: Boolean,
  default: false
}

});

var users = mongoose.model('users',usersSchema);
module.exports = users;
