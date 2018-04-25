var express = require('express');
var passport = require('passport');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var session = require('express-session')
var database= require('./database/connect');
 var app= express();

 //set the port here
 var port= process.env.PORT || 3000;
app.use('/assests',express.static(__dirname +'/public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
 app.set('view engine', 'handlebars');

 app.get('/', function (req, res) {
    res.render('home');
});

 app.use(session({
   secret: 'keyboard cat',
   resave: true,
   saveUninitialized: true
 }))





//connection establiahed to database
database.databaseconnectionusers();

//started a server here
 app.listen(port,()=>{
   console.log(`server started at port ${port}`);

 });
