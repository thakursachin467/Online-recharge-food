var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var complainSchema = new Schema ({
users:{
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
}

});

var complain= mongoose.model('complain',complainSchema);

module.exports = complain;
