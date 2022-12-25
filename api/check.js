const express = require ("express");
const Router = express.Router();
const Users = require("../models/users");

require("../db_connection/db");
const token = require("../db_connection/db");

Router.post("/check",token.authenticatetoken,function(req,res){
    res.json({
        status:1
    })
})

module.exports = Router;