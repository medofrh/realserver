const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storge = Schema({
    _id:Schema.Types.ObjectId,
    type:String,
    item:String,
    count:String,
    Edate:Date,
    Rdate:Date,
    note:String
})

module.exports=mongoose.model('storge',storge);