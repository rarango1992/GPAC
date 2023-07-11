const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prioritySchema = new Schema({
    level : Number,
    title: String,
});

module.exports = mongoose.model('priority', prioritySchema, 'priority');