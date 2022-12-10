const express = require ('express');
const Router = express.Router();
const transferlog = require("../models/transferlog");

require("../db_connection/db");
const close_connection = require("../db_connection/db");

Router.get('/transferlog',function (req,res){

});

module.exports = Router