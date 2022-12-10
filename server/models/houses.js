const mongoose =require('mongoose');
const Schema = mongoose.Schema

var houses = mongoose.Schema({
    _id:Schema.Types.ObjectId,
    HouseName:String,
    HouseZone:String,
    addresses:{
        addressetxt:String,
        coordinates:String,
        road:String
    }
})

module.exports=mongoose.model('houses',houses)