var items= require('../models/items');
var cart= require('../models/cart');
var auth= require('../helpers/auth');
var {ensureAuthenticated}= require('../helpers/auth');

module.exports= function(app) {

      //show items here
      app.get('/items',(req,res)=>{
          items.find({})
          .then((data)=>{
              res.render('items/show',{
                data:data
              });
          });

      });

      //edit an item by admin
      app.get('/item/edit/:id',ensureAuthenticated,(req,res)=>{

              items.findOne({_id:req.params.id})
              .then((data)=>{
                res.render('admin/edit',{
                  data:data
                });
              });

      });

      //update the info of a perticular item by admin
      app.put('/item/edit/:id',ensureAuthenticated,(req,res)=>{
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

      //delete a item by admin from entire website
      app.delete('/item/:id',ensureAuthenticated,(req,res)=>{
                items.findOneAndRemove({_id:req.params.id})
                .then(()=>{
                  req.flash('success_msg','item sucessfully deleted');
                  res.redirect('/dashboard');
                });

      });

      //delete an item from cart
      app.delete('/items/:id',(req,res)=>{
            cart.findOne({users:req.user._id})
            .then((data)=>{
                  if(data) {
                    cart.findOneAndRemove({items:req.params.id})
                    .then((data)=>{
                      req.flash('success_msg','item sucessfully removed from cart');
                      cart.find({users:req.user._id})
                        .populate('items')
                        .then((data)=>{
                          req.session.cart=data;
                          req.session.save(function(err) {
                          res.redirect('/cart');
                          });


                      });

                    });
                  }
            });
      });


}
