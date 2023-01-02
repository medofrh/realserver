const express = require ('express');
const Router = express.Router();
const persons = require("../models/persons");
const houses = require("../models/houses");

require("../db_connection/db");
const token = require ("../db_connection/db");

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
    function isEmpty(obj) {
        for (var key in obj) {
            if (obj[key] == undefined || obj[key]==""){
                return false;
            }
        }
        return true;
    }
    if(isEmpty(person)==true){
        var personadd = new persons(person)
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

    console.log(personID);
    persons
    .findOne({_id:personID})
    .exec()
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        res.sendStatus(403);
    })
})

module.exports = Router