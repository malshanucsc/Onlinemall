const express = require ('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');
//register

router.post('/register',function(req,res,next){
  let newUser = new User({
    name:req.body.name,
    username:req.body.username,
    password:req.body.password,
    email:req.body.email,
    contact:req.body.contact_no
  });

  User.addUser(newUser,function(err,user){

    if(err){
      res.json({success:false,message:'Fail to register user'});
    }else{
      res.json({success:true,message:'User registered'});
    }
  });


});

//authenticate
router.get('/authenticate',function(req,res){
  var username =  req.body.username;
  var password = req.body.password;

  User.getUserByUsername(username,function(err,user){
    if(err) throw err;
    if(!user){
      return res.json({success:false,message:"No user found"});
    }
    User.comparePassword(password,user.password,function(err,isMatch){
      if (err) throw err;
      if(isMatch){
        const token = jwt.sign(user,config.secret,{
          expiresIn:3600
        });
        res.json({
          success:true,
          token:"JWT "+token,
          user:{
            id:user._id,
            name:user.name,
            username:user.username,
            email:user.email
          }
        });
      }else{
        return res.json({success:false,message:"Wrong password"})
      }


    });


  });
});

//profile
router.get('/profile',passport.authenticate('jwt',{session:false}), function(req,res){
  res.send("register");
});


module.exports = router;
