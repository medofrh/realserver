const express = require ('express');
const Router = express.Router();
const campaigns = require("../models/campaigns");

require("../db_connection/db");
const token = require ("../db_connection/db");

Router.get('/campaignsfind',token.authenticatetoken,function (req,res){
    campaigns
    .find()
    .populate("houses")
    .exec()
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        res.status(403).json(err)
    })
});

Router.post("/addcampaign",token.authenticatetoken,function(req,res){
    var campaign = req.body.campaign;
    if(isnotEmpty(campaign)){
        var query = new campaigns(campaign);
        query
        .save()
        .then(result=>{
            console.log(result);
            res.sendStatus(200);
        })
        .catch(err=>{
            console.log(err);
            res.sendStatus(403);
        })
    }else{
        res.sendStatus(403);
    }
});

function isnotEmpty(obj) {
    for (var key in obj) {
        if (obj[key] == undefined || obj[key]==""){
            return false;
        }
    }
    return true;
}

module.exports = Router