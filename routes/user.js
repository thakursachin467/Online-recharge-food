var users= require('../models/users');
var items= require('../models/items');
var cart= require('../models/cart');
var orders= require('../models/orders')
var complains= require('../models/complain');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var Razorpay= require('razorpay');
var auth= require('../helpers/auth');
var {ensureAuthenticated}= require('../helpers/auth');
const orderid = require('order-id')('mysecret');

module.exports= function(app,passport){
  var instance = new Razorpay({
key_id: 'rzp_test_c1MSR57qMelY4b',
key_secret: '2qY31tri4Vt6g06J2r2MzOLO'
})




  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  app.use(bodyParser.json());

      app.get('/login',(req,res)=>{
        if(req.user) {
            res.redirect('/dashboard');
        }
        else {
            res.render('users/login');
        }

        });

        app.get('/dashboard',ensureAuthenticated,(req,res)=>{

          users.find({})
          .sort({'_id':-1})
          .then((data)=>{
            items.find({})
            .then((data1)=>{
              complains.find({})
              .sort({'_id':-1})
              .then((complain)=>{
                res.render('users/dashboard',{
                  users:data.slice(0,5),
                  items:data1.length,
                  userstotal:data.length,
                  usersall:data,
                  itemsall:data1,
                  complain:complain,
                  complaintotal:complain.length
                });

                cart.find({users:req.user._id})
                .populate('items')
                .then((data)=>{
                  req.session.cart=data;
                  req.session.save(function(err) {

        });
});
              });

            });
          });



        });



        app.get('/register',(req,res)=>{
            res.render('users/register');
        });




        app.post('/login',
            passport.authenticate('local', {
              successRedirect: '/dashboard',
              failureRedirect: '/login',
              failureFlash: true })
);


        //user will be validated and added to database using the mongoose models and bcryptjs for hashing
        app.post('/register',(req,res)=>{

              let errors=[];
              var Admin= false;
              if(req.body.Admin === 'imadmin') {
                Admin =true;
              }
              if(req.body.password!= req.body.password2) {
                errors.push({text:'Your passwords did not match'});
              }
              if(req.body.password.length<4){
                errors.push({text:'Password should be more then 4 characters'});
              }
              if(errors.length>0){
                res.render('users/register',{
                  errors:errors,
                  firstname:req.body.firstname,
                  lastname:req.body.lastname,
                  email:req.body.email,
                  password:req.body.password,
                  password2:req.body.password2
                });
              }
              else {
                users.findOne({email:req.body.email})
                .then((data)=>{
                  if(data) {
                    req.flash('error_msg','user already exists with this email');
                    res.redirect('/register');
                  }
                  else {
                      var user = users({
                        email:req.body.email,
                        firstname:req.body.firstname,
                        lastname:req.body.lastname,
                        password:req.body.password,
                        isAdmin:Admin
                      });
                      bcrypt.genSalt(10,function(err, salt) {
                      bcrypt.hash(user.password, salt, function(err, hash) {
                          if(err){
                            throw err;
                          }
                          else {
                              user.password= hash;
                              user.save()
                              .then(()=>{
                                  req.flash('success_msg','Your account sucessfully created,please login');
                                  res.redirect('/login');
                              });
                          }
                        });




                });

              }

        });

}


});
//post register req ends here



app.get('/logout',(req,res)=>{
      req.logout();
     req.flash('success_msg','you are sucessfully logged out');
      res.redirect('/login');

});

app.get('/cart',ensureAuthenticated,(req,res)=>{
    res.render('items/cart');
});

app.get('/cart/:id',(req,res)=>{

      var productId= req.params.id;
      items.findById(productId,(err,item)=>{
                  cart.findOne({items:productId})
                    .then((data)=>{
                      if(data){
                        var Oldquantity= data.quantity;
                        var adder= 1;
                        var Newquantity= Oldquantity+adder;
                        var price= item.itemPrice;
                        var totalPrice= price * Newquantity;
                        cart.findOneAndUpdate({items:productId},{
                          quantity:Newquantity,
                          totalPrice:totalPrice,
                          users:req.user._id,
                          items:productId
                        })
                        .then(()=>{
                          cart.find({users:req.user._id})
                          .populate('items')
                          .then((data)=>{
                            req.session.cart=data;
                            req.session.save(function(err) {
                                res.redirect('/items');
                  });


                          });

                        })

                      }
                      else {
                        var quantity= req.body.quantity || 1;
                        var price=item.itemPrice;
                        var totalPrice= price*quantity;
                        var OrderComplete= false;
                        var cartItem = new cart({
                          users:req.user._id,
                          items:productId,
                          totalPrice:totalPrice,
                          quantity:quantity,
                          OrderComplete:OrderComplete
                        });
                        cartItem.save()
                        .then(()=>{
                          cart.find({users:req.user._id})
                          .populate('items')
                          .then((data)=>{
                            req.session.cart=data;
                            req.session.save(function(err) {
                                res.redirect('/items');
                  });


                          });

                        })

                      }
                    });







      });




});



app.get('/complain',ensureAuthenticated,(req,res)=>{
    res.render('users/complain');
});

app.post('/complain',ensureAuthenticated,(req,res)=>{
      var email=req.user.email;
      var firstname = req.user.firstname;
      var lastname=req.user.lastname;
      var user=firstname.concat(" ",lastname);
      var subject=req.body.subject;
      var complain=req.body.complain;


      var complaindata= complains({
          email:email,
          user:user,
          complain:complain,
          subject:subject
      });

      complaindata.save()
      .then(()=>{
        req.flash('success_msg','Your complain sucessfully send');
        res.redirect('/dashboard');
      })


});


app.get('/checkout',ensureAuthenticated,(req,res)=>{

    if(req.session.cart.length==0){
      req.flash('error_msg','Please add some items');
        res.redirect('/items');
    }
    else {
      res.render("items/checkout",{
        key:instance.key_id
      });
    }

});

app.post('/checkout',ensureAuthenticated,(req,res)=>{


      instance.payments.capture(req.body.razorpay_payment_id, req.body.amount)
      .then((data)=>{
        cart.find({users:req.user._id})
        .then((data)=>{
          var OrderId=orderid.generate()
          var order = new orders({
            users:req.user._id,
            date: Date.now(),
            OrderId:OrderId

          })
          order.save();
          req.session.cart="NULL";
          req.session.save(function(err) {
              res.redirect('/cart');
            });


        });


      })
      .catch((error)=>{
        console.log(error);
      })

});


app.get('/orders/my',(req,res)=>{
      res.render('users/order');

});



}
