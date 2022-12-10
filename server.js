const express = require ("express");
const app = express();
const cors = require ("cors");

const port = process.env.PORT || "3030";

var corsOptions = {
origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.status(200).json({ message: "Welcome to bezkoder application." });
});

app.use(function(req,res){
    res.status(404).json({ message: "Sorry we can't find this page!"});
});

app.listen(port,function(){
    console.log(`we are listen on http://127.0.0.1:${port}`);
});