//create new model
var mongoose = require('mongoose'); //refering mongoose for creating user friendly class type model.
//defining schema for user model
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    role: String,
    created_at: {type: Date, default: Date.now}
    
});
mongoose.model('User', userSchema);
var User = mongoose.model('User');
exports.findByUsername = function(userName, callback){
User.findOne({ user_name: userName}, function(err, user){
        if(err){
            return callback(err);
        }
return callback(null, user);
});
}

exports.findById = function(id, callback){
User.findById(id, function(err, user){
        if(err){
           return callback(err);
        }
         return callback(null, user);
    });
}