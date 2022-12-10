const mongoose = require('mongoose')
const Schema = mongoose.Schema

var transferlog = mongoose.Schema({
    _id:Schema.Types.ObjectId,
    houseid:Number,
    itemid:{
        _id:Schema.Types.ObjectId,
        name:String,
        count:Number,
        note:String
    },
    campaignid:Number,
    count:Number
})

module.exports=mongoose.model('transferlog',transferlog)