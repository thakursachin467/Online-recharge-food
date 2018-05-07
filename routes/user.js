var users= require('../models/users');
var items= require('../models/items');
var complain= require('../models/complain');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var auth= require('../helpers/auth');

module.exports= function(app,passport){

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  app.use(bodyParser.json());

      app.get('/login',(req,res)=>{
          res.render('users/login');
        });

        app.get('/dashboard',(req,res)=>{
          users.find({})
          .sort({'_id':-1})
          .then((data)=>{
            items.find({})
            .then((data1)=>{
              complain.find({})
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
              console.log(req.body.Admin);
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
    //  req.flash('success_msg','you are logout');
      res.redirect('/');

});


app.get('/cart',(req,res)=>{

})

app.post('/complain',(req,res)=>{
      email:req.user.email;
      firstname : req.user.firstname;
      lastname:req.user.lastname;
      complain:req.body.complain;
      var complain= complain({
          email:email,
          firstname:firstname,
          lastname:lastname,
          complain:complain
      });

      complain.save()
      .then(()=>{
        req.flash('success_msg','Your complain sucessfully send');
        res.redirect('/dashboard');
      })


});



}
