const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var persons = mongoose.Schema({
    _id:Schema.Types.ObjectId,
    fullname:String,
    nationality:String,
    phonenummber:Number,
    birthday:String,
    tc:Number,
    dateadd:String,
    sex:String,
    note:String,
    Priority:Number,
    houseid:Schema.Types.ObjectId,
    deprtement:String
})

module.exports=mongoose.model('persons',persons);