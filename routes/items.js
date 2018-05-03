var items= require('../models/items');
var cart= require('../models/cart');

module.exports= function(app) {

      //show items here
      app.get('/item/show',(req,res)=>{
          res.render('items/show');
      });

      //add an item to cart
      app.put('/item/edit/:id',(req,res)=>{


      });

      //delete a item from cart
      app.delete('/item/:id',(req,res)=>{


      });

}
