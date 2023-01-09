const express = require ('express');
const Router = express.Router();
const campaigns = require("../models/campaigns");
const fs = require ("fs");

require("../db_connection/db");
const token = require ("../db_connection/db");
const campaign_print = require ("../pdf_generator/campaign");

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
    console.log(campaign)
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

Router.get("/reportcampaign",token.authenticatetoken,function(req,res){
    var query = {
        type:req.query.type,
        Mdate:req.query.Mdate
    }
    let randomNumber = Math.floor(Math.random() * 999999) + 1;
    var path = `./pdf/${randomNumber}.pdf`;
    campaigns
    .find({end_c:{$gt:query.Mdate}})
    .populate("houses")
    .exec()
    .then(async result=>{
            await campaign_print(result,randomNumber,()=>{
            var file = fs.createReadStream(path);
            var stat = fs.statSync(path);
            res.setHeader('Content-Length', stat.size);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
            file.pipe(res); 
        });
    })
    .catch(err=>{
        console.log(err)
        res.status(403).json(err);
    })
})

function isnotEmpty(obj) {
    for (var key in obj) {
        if (obj[key] == undefined || obj[key]==""){
            return false;
        }
    }
    return true;
}
function calc(e){
    e=new Date(e)
    return e.getFullYear() * 8760 + (e.getMonth()+1) * 730 + e.getDate() * 24
}

module.exports = Router