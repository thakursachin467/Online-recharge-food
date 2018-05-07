var users= require('../models/users');
var items= require('../models/items');
var cards= require('../models/cards');
var bodyParser = require('body-parser');
var auth= require('../helpers/auth');


module.exports = function(app){

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  app.use(bodyParser.json());

  app.post('/items',(req,res)=>{

          var itemName= req.body.itemname;
          var itemPrice= req.body.itemprice;
          var ItemProvider= req.body.Itemprovider;
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

  app.get('/admin/item',(req,res)=>{
      items.find({})
      .then((data)=>{
        res.render('admin/item',{
          data:data
        });
      });


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
