const mongoose =require('mongoose');
const Schema = mongoose.Schema;

/*var login = Schema({
        _id:Schema.Types.ObjectId,
        username:String,
        password:String,
        token:String
});
*/

var users = Schema ({
        username: {
                type: String,
                required: true,
                unique: true
        },
        password: {
                type: String,
                required: true
        },token:{
                type: String
        }})

module.exports=mongoose.model('users',users);