module.exports= {

  database:'mongodb://localhost:27017/meanauth',
	secret:'yoursecret',

  connectToDb:function(){

  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost:27017/cola_online_mall',function(err){

  if (err) {
    console.log('Not Connected');

  }else {
    console.log('Connected to mongo DB');
  }

});
}
}
