const express = require ('express');
const Router = express.Router();
const storage = require("../models/storage");

require("../db_connection/db");
const token = require("../db_connection/db");

Router.post('/addstorge',token.authenticatetoken,(req,res)=>{
    var storageData = {
        type : req.body.type,
        item : req.body.item,
        count : req.body.count,
        Edate : req.body.Edate,
        Rdate : req.body.Rdate,
        note : req.body.note ? req.body.note : "boş"
    }
    
    function isnotEmpty(obj) {
        for (var key in obj) {
            if (obj[key] == undefined || obj[key]==""){
                return false;
            }
        }
        return true;
    }
    
    if(isnotEmpty(storageData)==true){
        console.log(storageData);
        const Storage = new storage(storageData);

        Storage
        .save()
        .then(result=>{
            res.status(200).json(result);
        })
        .catch(err=>{
            console.log(err)
            res.status(403).json(err);
        });

    }else{ 
        res.sendStatus(403)
    }
})

Router.get('/findstorge',token.authenticatetoken,(req,res)=>{
    var type = req.query.type;

    if(type!==undefined){
        storage
        .find({type:type})
        .exec()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            res.status(403).json(err)
        })
    }else{
        res.sendStatus(403)
    }
})

module.exports = Router