const mongoose = require ('mongoose');
const jwt = require ("jsonwebtoken");
require("dotenv").config();

mongoose.connect('mongodb://medo:M6e3d3o6@127.0.0.1:27017/medo?connectTimeoutMS=1000&authSource=admin');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("the connection is open!");
});

module.exports = function close_connection() {
    mongoose.connection.close();
    console.log("DB has been closed :)");
};


module.exports = function generateAccesstoken(user) {
    return jwt.sign(user , process.env.ACCESS_TOKEN_SECRET,{expiresIn:'86400s'})
}

function authenticatetoken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null){
        res.sendStatus(401)
    }else{
        Loginn
        .find({token:token})
        .exec()
        .then(result=>{
            if(result.length == 1){
                var DBtoken = result[0].token
                if(token===DBtoken){
                    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
                        if(user==null){
                            res.sendStatus(403)
                        }else{
                            Loginn
                            .find({username:user.name})
                            .exec()
                            .then(result=>{
                                if(result.length==1){
                                    if (err) return res.sendStatus(403)
                                        next();
                                }else{
                                    console.log('error in the token')
                                    res.sendStatus(403)
                                }
                            })
                            .catch(err=>{
                                res.sendStatus(403).json(err)
                            })
                        }
                    })
                }else{
                    res.status(500).json({'err':'the token is not identical'})
                }
            }else{
                res.status(500).json({'err':'the token is not identicallll'})
            }
        })
        .catch(err=>{
            console.log('rows is empty')
            res.status(403).json(err)
        })
    }
}
