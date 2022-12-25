const express = require ('express');
const Router = express.Router();
const Users = require("../models/users");

require("../db_connection/db");
const generateAccesstoken = require("../db_connection/db");

Router.post('/signin',function(req,res){
    const user = req.body.username
    const pass = req.body.password

    const username = user&&user.split("'")[0]
    const password = pass&&pass.split("'")[0]
    
    var data;

    if (typeof username !== "undefined" && typeof password !== "undefined"){
        data = {
            username:username,
            password:password,
            token:generateAccesstoken({username:username})
        }
        Users.create(data,function(err,result){
            if (err) {
                res.json({
                    status: 0,
                    message: err
                });
            }
            else if (!user) {
                res.json({
                    status: 0,
                    message: "not found"
                });
            } else{
                res.json({
                    status: 1,
                    data:result
                })
            }
        })
    }
});

module.exports = Router;