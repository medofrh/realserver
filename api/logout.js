const express = require ("express");
const Router = express.Router();
const Users = require("../models/users");

require("../db_connection/db");
const token = require("../db_connection/db");

Router.post("/logout",function(req,res){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null){
        res.sendStatus(403);
    }else{
        Users.findOneAndUpdate({token:token}, {$set:{token:""}}, {new: true}, (err, doc) => {
            if (err == null) {
                res.sendStatus(403);
                // console.log(doc)
            }else{
                // console.log(err,"nas")
                res.sendStatus(200);
            }
        });
    }
});

module.exports = Router;