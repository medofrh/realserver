const mongoose =require('mongoose')
const Schema = mongoose.Schema

const campaigns = Schema({
        _id:Schema.Types.ObjectId,
        zone:Array,
        houses:[
                {
                housename:String,
                houseid:Schema.Types.ObjectId
                }
        ],
        item:String,
        count:Number,
        start_c:Date,
        end_c:Date
    })


module.exports=mongoose.model('campaigns',campaigns)