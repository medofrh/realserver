const express = require ('express');
const Router = express.Router();
const persons = require("../models/persons");

require("../db_connection/db");
const close_connection = require("../db_connection/db");

Router.get('/persons',function (req,res){

});

module.exports = Router