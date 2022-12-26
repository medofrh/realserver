const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var persons = Schema({
    fullname:{
        type:String,
        unique:true
    },
    nationality:String,
    phonenummber:{
        type:Number,
        unique:true
    },
    birthday:String,
    tc:{
        type:Number,
        unique:true
    },
    dateadd:String,
    sex:String,
    note:String,
    Priority:Number,
    houseid:Schema.Types.ObjectId,
    departement:String
});

module.exports=mongoose.model('persons',persons);