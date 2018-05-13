var express = require('express');
var passport = require('passport');
var passport1 = require('passport');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var database= require('./database/connect');
var users= require('./routes/user');
var admin= require('./routes/admin');
var items= require('./routes/items');
var pasportConfig= require('./config/passport');
const mongoose = require('mongoose');
var path = require('path');
var methodOverride = require('method-override');
const {limit,formatdate,conditional,size,total,totalitems,totalpay,conditional1,conversion}=require('./helpers/hbs');
const MongoStore = require('connect-mongo')(session);
var app= express();

 //set the port here
 var port= process.env.PORT || 3000;
app.use('/assests',express.static(__dirname +'/public'));

app.engine('handlebars', exphbs({
  helpers:{
  limit:limit,
  formatdate:formatdate,
  conditional:conditional,
  size:size,
  total:total,
  totalitems:totalitems,
  totalpay:totalpay,
  conditional1:conditional1,
  conversion:conversion
},
defaultLayout: 'main'}));
 app.set('view engine', 'handlebars');

 // parse application/json
 app.use(bodyParser.json());

//express sessions middleware
 app.use(session({
   secret: 'keyboard cat',
   resave: true,
   saveUninitialized: true,
   store: new MongoStore({ mongooseConnection: mongoose.connection }),
   cookie : {maxAge:180 * 60 * 60 * 1000}
 }));




 //flash middleware
 app.use(flash());

 //passport middleware
 app.use(passport.initialize());
 app.use(passport.session());

 //method override middleware
 app.use(methodOverride('_method'));

//global variables
 app.use(function(req,res,next) {

    res.locals.success_msg= req.flash('success_msg');
    res.locals.error_msg= req.flash('error_msg');
    res.locals.error= req.flash('error');
    res.locals.userid=req.user || null;
    res.locals.sessions= req.session;



      next();

});





//user register and login path
users(app,passport);
//items added and all operations are handled here
//admin(app);





//all item related properties are here like show add to cart etc
items(app);


admin(app);






app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,"online","index.html"));


});



//connection establiahed to database
database.databaseconnectionusers();
pasportConfig(passport);

//started a server here
 app.listen(port,()=>{
   console.log(`server started at port ${port}`);



 });
