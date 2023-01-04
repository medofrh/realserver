const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storage = Schema({
    type:{
        type:String,
        required:true
    },
    item:{
        type:String,
        required:true
    },
    count:{
        type:String,
        required:true
    },
    Edate:{
        type:Date,
        required:true
    },
    Rdate:{
        type:Date,
        required:true
    },
    note:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('storage',storage);