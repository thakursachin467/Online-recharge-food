var mongoose = require('mongoose');
 var Schema = mongoose.Schema;


 var itemsSchema = new Schema({

      itemName : {
        type: String,
        require:true
      },
      itemPrice :{
        type: String,
        require:true
      },
      description :{
        type:String,
        require: true
      },
      ItemProvider :{
        type:String,
        require:true
      },
      ItemAvailable :{
        type:Boolean,
        default:true
      }


 });


 var items= mongoose.model('item',itemsSchema);

 module.exports = items;
