const express = require ('express');
const Router = express.Router();
const campaigns = require("../models/campaigns");

require("../db_connection/db");
const close_connection = require("../db_connection/db");

Router.get('/campaigns',function (req,res){

});

module.exports = Router