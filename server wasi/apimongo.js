const mongoose = require('mongoose');
const express = require('express');

const Loginn = require('./models/login');
const campaigns = require('./models/campaigns');
const houses = require('./models/houses');
const persons = require('./models/persons');
const storge = require('./models/storge');

const router = express.Router();


mongoose.createConnection(
    "localhost:27017/MK",
    {
      "auth": {
        "authSource": "admin"
      },
      "user": "wasi",
      "pass": "123456"
    }
  );

  router.get('/',(req,res)=>{
    res.status(200);
  })