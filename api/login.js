const express = require ('express');
const Router = express.Router();
const login = require("../models/login");

require("../db_connection/db");
const close_connection = require("../db_connection/db");

Router.get('/login',function (req,res){

});

module.exports = Router