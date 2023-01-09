const express = require ('express');
const Router = express.Router();
const houses = require("../models/houses");
const persons = require("../models/persons");
const fs = require("fs");

require("../db_connection/db");
const token = require ("../db_connection/db");
const print = require('../pdf_generator/houses');

Router.get("/housesfind",token.authenticatetoken,function (req,res){
    var zone = req.query.zone;
    if(zone !== undefined){
        houses
        .find({HouseZone:zone})
        .exec()
        .then(result=>{
            res.status(200).json(result);
        })
        .catch(err=>{
            res.status(403).json({err:err});
        });
    }else{
        res.sendStatus(403);
    }
});

Router.post("/houseadd",token.authenticatetoken,function (req,res){
    var HouseName=req.body.HouseName,
    HouseZone=req.body.HouseZone,
    addressetxt=req.body.address,
    coordinates=req.body.coordinates,
    road=req.body.road;

    if (HouseName&&
        HouseZone&&
        addressetxt&&
        coordinates&&
        road !==undefined)
        {

            if(HouseZone=='W'||
            HouseZone=='S'||
            HouseZone=='E'||
            HouseZone=='N') {

                const Houses = new houses({
                    HouseName:HouseName,
                    HouseZone:HouseZone,
                    addresses:{
                        addressetxt:addressetxt,
                        coordinates:coordinates,
                        road:road
                    }
                })

                Houses
                .save()
                .then(result=>{
                    res.status(200).json(result);
                })
                .catch(err=>{
                    res.status(403).json(err);
                    console.log(err);
                })
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(403);
    }
});

Router.post("/housedel",token.authenticatetoken,function (req,res){
    var houseID = req.body.houseid;

    if(houseID.constructor == Array){
        if(houseID.length!==0){
            var a=[],b=[];
            houses
            .deleteMany({_id:{$in:houseID}})
            .exec()
            .then(result=>{
                a.push(result);
            })
            .catch(err=>{
                b.push(err);
            })
            if(b.length==0){res.status(200).json(a)}
            else if(b.length!==0){res.status(403).json(b)}
            else{res.sendStatus(403)}
        }else{
            res.sendStatus(403);
        }
    }else{
        res.sendStatus(403)
    }
    
});

Router.get("/reportzone",function(req,res){
    var zone = req.query.zone;
    let randomNumber = Math.floor(Math.random() * 999999) + 1;
    var path = `./pdf/${randomNumber}.pdf`;
    if(isnotEmpty(zone)==true){
        houses
        .find({HouseZone:zone})
        .exec()
        .then(async result=>{
            await print.house_print(result,randomNumber,()=>{
                var file = fs.createReadStream(path);
                var stat = fs.statSync(path);
                res.setHeader('Content-Length', stat.size);
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
                file.pipe(res);
            });
        })
        .catch(()=>{
            res.sendStatus(403);
        })
    }
});

Router.get("/reportpriority",token.authenticatetoken,function(req,res){
    var query = {
        zone : req.query.zone,
        sex : req.query.sex,
        priority : req.query.priority
    }
    let randomNumber = Math.floor(Math.random() * 999999) + 1;
    var path = `./pdf/${randomNumber}.pdf`;
    if(isnotEmpty(query)==true){
        // {houseid:{$elemMatch: {HouseZone:"E"}}}
        persons
        .find()
        .populate({
            path: 'houseid',
            match: { HouseZone: query.zone }
        })
        .then(async result=>{
            console.log(result)
            if(result!="undefined"){
                await print.house_priority_print(result,query,randomNumber,()=>{
                    var file = fs.createReadStream(path);
                    var stat = fs.statSync(path);
                    res.setHeader('Content-Length', stat.size);
                    res.setHeader('Content-Type', 'application/pdf');
                    res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
                    file.pipe(res);
                });
            }else{
                res.sendStatus(403);
            }
        })
        .catch(err=>{
            console.log(err);
            res.sendStatus(403);
        })
    }
})

function isnotEmpty(obj) {
    for (var key in obj) {
        if (obj[key] == undefined || obj[key]==""){
            return false;
        }
    }
    return true;
}


module.exports = Router