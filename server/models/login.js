const mongoose = require('mongoose')
const Schema = mongoose.Schema

var login = mongoose.Schema({
        _id:Schema.Types.ObjectId,
        username:String,
        password:String,
        token:String
})

module.exports=mongoose.model('login',login)