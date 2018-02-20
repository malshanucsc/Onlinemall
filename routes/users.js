const express = require ('express');
const router = express.Router();


//register

router.get('/register',function(req,res){
  res.send("register");
});

//authenticate
router.get('/authenticate',function(req,res){
  res.send("register");
});

//profile
router.get('/profile',function(req,res){
  res.send("register");
});

//validate
router.get('/validate',function(req,res){
  res.send("register");
});

module.exports = router;
