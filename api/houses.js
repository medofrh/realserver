const express = require ('express');
const Router = express.Router();
const houses = require("../models/houses");
require("../db_connection/db");
const token = require ("../db_connection/db");

Router.get("/housesfind",token.authenticatetoken,function (req,res){
    var zone = req.query.zone;
    if(zone !== undefined){
        houses
        .find()
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

module.exports = Router