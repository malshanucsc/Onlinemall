const mongoose = require('mongoose');
const bcrypt =  require('bcryptjs');
const config = require('../config/db');

//user schema

const UserSchema = mongoose.Schema({
  name:{type:String,required:true},
  username:{type:String,lowercase:true,required:true,unique:true},
  password:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  contact:{type:Number,unique:true}
});

const User = module.exports = mongoose.model('User',UserSchema);

module.exports.getUserById = function(id,callback){
  User.findById(id,callback);
}

module.exports.getUserByUsername = function(username,callback){
  const query = {username:username}
  User.findOne(query,callback);
}

module.exports.addUser = function(newUser,callback){
  const saltRounds = 10;
  bcrypt.hash(newUser.password,saltRounds,function(err,hash){

    if(err) throw err;
    newUser.password=hash;
    newUser.save(callback);
  });
}

module.exports.comparePassword = function(password,hashed_password){
  const saltRounds = 10;
  bcrypt.compare(password,hashed_password,function(err,isMatch){
    if(err) throw err;
    callback(null,isMatch);
  });

}
