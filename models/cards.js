var mongoose = require('mongoose');
var users= require('./users');
var Schema = mongoose.Schema;
ObjectId=Schema.Types.ObjectId

var cardSchema = new Schema ({
  cardno:{
    type:Number,
    required:true
  },
  cardbalance:{
      type:Number,
      required:true
  },
users:{
  type:ObjectId,
  ref:'users'
}

});
