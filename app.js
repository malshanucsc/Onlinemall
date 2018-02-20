const express = require ('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/db');



const app = express();

const port=process.env.PORT  || 8080;

//db connect
config.connectToDb();

//route set
const users=require('./routes/users');




//CORS middleware
app.use(cors());

//set static folder

app.use(express.static(path.join(__dirname,'public')));

//body parser middleware
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:true}));
app.use('/users',users);


app.get('/',function(req,res){
  res.send("Invalid Endpoint")
});


app.listen(port, function(){
  console.log('Running the Server on port '+port);
});


//
// var morgan= require('morgan');
//
//
// const config = require('./config/db');
// var router = express.Router();
// var appRoutes = require('./app/routes/api')(router);
//
//
//
//
//
//
//
// app.use(morgan('dev'));
//
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.static(__dirname+'/public'));
//
// app.use('/api',appRoutes);
//
// config.connectToDb();
//
// app.get('*',function(req,res){
//   res.sendFile(path.join(__dirname+'/public/app/views/index.html'));
// });
