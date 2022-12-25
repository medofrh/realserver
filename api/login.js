const express = require ('express');
const Router = express.Router();
const Login = require("../models/login");

require("../db_connection/db");
const close_connection = require("../db_connection/db");

Router.get('/login',function (req,res){
    var username = req.body.username;
    var password = req.body.password;

    Login
    .find({username:username,password:password})
    .exec()
    .then(

    )
    .catch(

    );
});

module.exports = Router