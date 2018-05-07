var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var complainSchema = new Schema ({
user:{
  type: String
},
complain:{
  type: String
},
email:{
  type: String
},
date:{
  type:Date,
  default:Date.now,
  required:true
},
subject:{
  type: String
}

});

var complain= mongoose.model('complain',complainSchema);

module.exports = complain;
