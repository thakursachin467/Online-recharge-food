var mongoose = require('mongoose');
 var Schema = mongoose.Schema;

 var adminSchema = new Schema ({

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
  }

 });

  var admin = mongoose.model('admin', adminSchema);

  module.exports = admin;
