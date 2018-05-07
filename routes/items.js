var items= require('../models/items');
var cart= require('../models/cart');
var auth= require('../helpers/auth');

module.exports= function(app) {

      //show items here
      app.get('/item/show',(req,res)=>{
          res.render('items/show');
      });

      //add an item to cart
      app.get('/item/edit/:id',(req,res)=>{

              items.findOne({_id:req.params.id})
              .then((data)=>{
                res.render('admin/edit',{
                  data:data
                });
              });

      });

      app.put('/item/edit/:id',(req,res)=>{
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
          items.findOneAndUpdate({_id:req.params.id},{
            itemName:itemName,
            itemPrice:itemPrice,
            ItemProvider:ItemProvider,
            ItemAvailable:ItemAvailable,
            description:description
          })
          .then((data)=>{
            req.flash('success_msg','item sucessfully edited');
            res.redirect('/dashboard');
          });

      });

      //delete a item from cart
      app.delete('/item/:id',(req,res)=>{
                items.findOneAndRemove({_id:req.params.id})
                .then(()=>{
                  req.flash('success_msg','item sucessfully deleted');
                  res.redirect('/dashboard');
                });

      });

}
