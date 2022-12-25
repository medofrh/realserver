const express = require ("express");
const app = express();
const cors = require ("cors");

const API_login = require("./api/login");
const API_signin = require("./api/signin");
const API_logout = require("./api/logout");
const API_check = require("./api/check");
const API_houses = require("./api/houses");
const API_campaigns = require("./api/campaigns");
const API_persons = require("./api/persons");
const API_storage = require("./api/storage");
const API_transferlog = require("./api/transferlog");

const port = process.env.PORT || "3030";

var corsOptions = {
    origin: "http://localhost:3030"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// app.get('/', function (req, res) {
//     res.status(200).json({ message: "Welcome to bezkoder application." });
// });
app.use("/",API_login);
app.use("/",API_signin);
app.use("/",API_logout);
app.use("/",API_check);
app.use("/",API_houses);
app.use("/",API_campaigns);
app.use("/",API_persons);
app.use("/",API_storage);
app.use("/",API_transferlog);

app.use(function(req,res){
    res.status(404).json({ message: "Sorry we can't find this page!"});
});

app.listen(port,function(){
    console.log(`we are listen on http://127.0.0.1:${port}`);
});