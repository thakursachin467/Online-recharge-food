var users= require('../models/users');
var items= require('../models/items');
var cards= require('../models/cards');
var bodyParser = require('body-parser');
var auth= require('../helpers/auth');
var {ensureAuthenticated}= require('../helpers/auth');



module.exports = function(app){

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  app.use(bodyParser.json());


  //add an item by admin to entire website
  app.post('/items',ensureAuthenticated,(req,res)=>{

          var itemName= req.body.itemname;
          var itemPrice= req.body.itemprice;
          var ItemProvider= req.body.Itemprovider.toUpperCase();
          var description= req.body.editor1;
          if(req.body.avalability) {
              var ItemAvailable= true;
          }
          else {
            var ItemAvailable = false;
          }


              items.findOne({itemName:req.body.itemname})
              .then((data)=>{
                if(data) {
                  req.flash('error_msg','item already exists');
                  res.redirect('/dashboard');
                }
                else {
                    var item = items({
                      itemName:itemName,
                      itemPrice:itemPrice,
                      ItemProvider:ItemProvider,
                      ItemAvailable:ItemAvailable,
                      description:description
                    });
                    item.save()
                    .then(()=>{
                      req.flash('success_msg','item sucessfully added');
                      res.redirect('/dashboard');
                    });
                }
              });

  });


  







}
