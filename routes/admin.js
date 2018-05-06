var users= require('../models/users');
var items= require('../models/items');
var cards= require('../models/cards');
var bodyParser = require('body-parser');

module.exports = function(app){

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  app.use(bodyParser.json());

  app.post('/items',(req,res)=>{

          var itemName= req.body.itemname;
          var itemPrice= req.body.itemprice;
          var ItemProvider= req.body.Itemprovider;
          var ItemAvailable= req.body.avalability;
          var description= req.body.description;
          if(itemName.length==0 || itemPrice.length==0 || ItemProvider.length==0 || ItemAvailable.length==0 || description.length==0) {
            req.flash('error_msg','All fields are mandatory');
          }
          else {
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
          }
  });


  app.get('/users/show/all',(req,res)=>{
          users.find({isAdmin:false})
          .then((data)=>{

            res.render('admin/showuser',{
              data:data
            })
          })


  })




}
