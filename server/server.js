const express = require ('express')
const bodyParser = require ('body-parser')
const cors = require ('cors')
const path =require('path')

// const Api_sql = require('./api_sql')

const Apimongo = require('./apimongo')
const app = express()
const port = process.env.PORT || '3030'

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors({origin: '*'}))
app.set('views',path.join(__dirname,'html'))
app.set('view engine', 'ejs');
// app.use('/apisql',Api_sql)
app.use('/',Apimongo)

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that !")
})

app.listen(port,()=>{
    console.log(`we are listen on http://127.0.0.1:${port}`)
})