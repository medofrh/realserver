const express = require ("express");
const app = express();

const port = process.env.PORT || "3030";

app.get('/', function (req, res) {
    res.sendStatus(200);
});

app.use(function(res){
    res.status(404).send("Sorry we can't find this page!");
});

app.listen(port,function(){
    console.log(`we are listen on http://127.0.0.1:${port}`);
});