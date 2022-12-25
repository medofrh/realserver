const mongoose =require('mongoose');
const Schema = mongoose.Schema;

var houses = Schema({
    HouseName:{
        type:String,
        unique:true
    },
    HouseZone:{
        type:String,
        required:true
    },
    addresses:{
        addressetxt:String,
        coordinates:String,
        road:String
    }
});

module.exports=mongoose.model('houses',houses);