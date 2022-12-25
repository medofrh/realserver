const express = require ('express');
const Router = express.Router();
const Users = require("../models/users");

require("../db_connection/db");
const close_connection = require("../db_connection/db");
const generateAccesstoken = require("../db_connection/db");

Router.get('/login',function (req,res){
    const user = req.body.username
    const pass = req.body.password

    const username = user&&user.split("'")[0]
    const password = pass&&pass.split("'")[0]

    var data;
    if (typeof username !== "undefined" && typeof password !== "undefined"){
        data = {
            username:username,
            password:password
        }
    
    Users.findOne(data, function(err, user) {
        if (err) {
            res.json({
                status: 0,
                message: err
            });
        }
        if (!user) {
            res.json({
                status: 0,
                message: "not found"
            });
        }else{
            var userID = user._id;
            var userData = {name:user.username};
    
            const accessToken=generateAccesstoken(userData);
            
            Users
            .findByIdAndUpdate({_id:userID},{token:accessToken})
            .exec()
            .then(results=>{
    
                res.status(200).json({
                    status: 1,
                    'token':accessToken,
                    'username':results._id
                })
            })
            .catch(err=>{
                res.status(401).send(err)
            })
        }
    })
    }else{
        res.json({
            status: 0,
            message: "empty input"
        });
    }
    // Users
    // .findOne(data)
    // .exec()
    // .then(function(data){
    //     res.send({
    //         status: 1,
    //         id: user._id,
    //         message: " success",
    //         data:data
    //     })
    // }
    // )
    // .catch(
    //     res.json({
    //         status: 0,
    //         message: err
    //     })
    // );
});

module.exports = Router