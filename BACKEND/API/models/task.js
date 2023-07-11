const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    userId : String,
    title: String,
    description: String,
    status : Number,
    priority: Number,
    endDate : String,
    updateDate: String,
    notes: [],
    tags: []
});

module.exports = mongoose.model('task', taskSchema);