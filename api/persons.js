const express = require ('express');
const Router = express.Router();
const persons = require("../models/persons");
const person_print = require ("../pdf_generator/person");
const fs = require("fs");

require("../db_connection/db");
const token = require ("../db_connection/db");
const { Stream } = require('stream');

Router.post('/personadd',token.authenticatetoken,function (req,res){
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    var person = {
        fullname:req.body.fullname,
        nationality:req.body.nationality,
        phonenummber:req.body.phonenummber,
        birthday:req.body.birthday,
        tc:req.body.tc,
        dateadd:`${today.toLocaleDateString()}`,
        sex:req.body.sex,
        note:req.body.note ? req.body.note : "boş",
        Priority:'0',
        houseid:req.body._id,
        departement:req.body.departement
    };

    if(isnotEmpty(person)==true){
        var personadd = new persons(person);
        personadd
        .save()
        .then(result=>{
            res.status(200).json(result);
        })
        .catch(err=>{
            res.status(403).json(err);
        });
    } else {
        res.sendStatus(403)
    }
});

Router.get("/personfind", function (req,res){
    var houseID = req.query.houseid;

    persons.find({houseid:houseID})
        .populate("houseid")
        .exec()
        .then(result=>{
            res.json(result)
        })
        .catch(err=>{
            res.sendStatus(403);
        })
});

Router.get("/personrequest",token.authenticatetoken,function (req,res){
    var personID = req.query.personid;

    persons
    .findOne({_id:personID})
    .exec()
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        res.sendStatus(403);
    })
});

Router.post("/personupdate",token.authenticatetoken,function (req,res){
    var personObj = req.body.person;
    if(personObj._id==undefined||personObj._id==""){
        res.sendStatus(403);
    }else{
        persons
        .findByIdAndUpdate(personObj._id,personObj)
        .exec()
        .then(result=>{
            res.json(result);
        })
        .catch(err=>{
            res.json(err);
        })
    }
});

Router.post('/addpersonpriority',token.authenticatetoken,function (req,res){
    var personID = req.body.personid
    var priority = req.body.priority

    console.log(personID,"\n",priority)
    if(personID!==undefined&&priority!==undefined){
        persons
        .findOneAndUpdate({_id:personID},{Priority:priority})
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

Router.delete("/delperson",token.authenticatetoken,function(req,res){
    var personID = req.body.personid;
   
    if(personID.constructor==Array){
        if(personID.length!==0){
            persons
            .deleteMany({_id:{$in:personID}})
            .exec()
            .then(result=>{
                res.json(result);
            })
            .catch(err=>{
                res.json(err);
            })
        }else{
            res.sendStatus(403)
        }
    }else{
        res.sendStatus(403)
    }
})

Router.get("/reporthouse",token.authenticatetoken, function(req,res){
    var houseid = req.query.houseid;
    const randomNumber = Math.floor(Math.random() * 999999) + 1;
    var path = `./pdf/${randomNumber}.pdf`;
    if(isnotEmpty(houseid)==true){
        persons
        .find({houseid:houseid})
        .populate("houseid")
        .exec()
        .then(async result=>{
            await person_print(result,randomNumber,()=>{
                var file = fs.createReadStream(path);
                var stat = fs.statSync(path);
                res.setHeader('Content-Length', stat.size);
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
                file.pipe(res);
                
            });
        })
        .catch(err=>{
            res.sendStatus(403);
            console.log("err "+err)
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