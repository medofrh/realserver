const express = require ('express');
const Router = express.Router();
const campaigns = require("../models/campaigns");

require("../db_connection/db");
const token = require ("../db_connection/db");

Router.get('/campaignsfind',token.authenticatetoken,function (req,res){
    campaigns
    .find()
    .exec()
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        res.status(403).json(err)
    })
});


module.exports = Router