const express = require ('express');
const Router = express.Router();
const storage = require("../models/storage");

require("../db_connection/db");
const close_connection = require("../db_connection/db");

Router.get('/storage',function (req,res){

});

module.exports = Router