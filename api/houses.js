const express = require ('express');
const Router = express.Router();
const houses = require("../models/houses");
require("../db_connection/db");
const close_connection = require("../db_connection/db");

Router.get('/houses',function (req,res){
    houses
    .find()
    .exec()
    .then(result=>{
        res.status(200).json({Result:result});
        close_connection();
    })
    .catch(err=>{
        res.status(500).json({err:err});
        close_connection();
    });
});

module.exports = Router