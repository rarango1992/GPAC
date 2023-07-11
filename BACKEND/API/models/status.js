const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = new Schema({
    code : Number,
    title: String,
});

module.exports = mongoose.model('status', statusSchema);