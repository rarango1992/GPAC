const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    password : String, 
    adminPrivileges: Boolean,
});

module.exports = mongoose.model('user', userSchema);