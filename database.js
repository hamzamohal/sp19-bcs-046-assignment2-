const mongoose = require('mongoose');
var Schema = mongoose.Schema
var UserSchema = new Schema({
    name: String,
    email: String,
    education: String,
    experience: String
});

module.exports = mongoose.model('User', UserSchema);