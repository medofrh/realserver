require("dotenv").config()
const mongoose = require('mongoose')
const fs = require('fs')
const express = require ('express')
const bodyParser = require ('body-parser')
const jwt = require ('jsonwebtoken')
const router = express.Router()

// const Pdf = require('./pdf/pdf-generator')
// const pdf = new Pdf()



const Loginn = require('./models/login')
const campaigns = require('./models/campaigns')
const houses = require('./models/houses')
const persons = require('./models/persons')
const storge = require('./models/storge')
// const { resolve } = require("path")
// const { rejects } = require("assert")
// const { id } = require("pdfkit/js/reference")

// const transferlog = require('./models/transferlog')

mongoose.connect('mongodb://medo:M6e3d3o6@192.168.1.225/medo?authSource=admin');
// mongoose.connect('mongodb://medo:M6e3d3o6@127.0.0.1:27017/medo',{useNewUrlParser: true, useUnifiedTopology: true});


router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

fs.readdirSync(__dirname+'/models').forEach(function(filename){
    if(~filename.indexOf('.js'))require(__dirname+'/models/'+filename)
})

router.get('/',(req,res)=>{
    Loginn
    .find()
    .exec()
    .then(docs => {
        res.status(200).json(docs)
    })
    .catch(err => {
        res.status(500).json({
        error: err
      })
    })
})

router.post('/logout',(req,res)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null){
        res.sendStatus(401)
    }else{
        Loginn
        .find({token:token})
        .exec()
        .then(result=>{
            if(result.length==1){
                var userID = result[0]._id

                Loginn
                .findByIdAndUpdate({_id:userID},{token:' '})
                .exec()
                .then(result=>{
                    res.status(200).json(result)
                })
                .catch(err=>{
                    res.status(403).json(err)
                })

            }
        })
        .catch(err=>{
            res.status(403).json(err)
        })
    }
})

router.post('/check',authenticatetoken,(req,res)=>{
    res.sendStatus(200)
})

router.post('/login',(req,res)=>{
    res.setHeader('Content-Type', 'application/json')

    const user = req.body.username
    const pass = req.body.password

    const username = user&&user.split("'")[0]
    const password = pass&&pass.split("'")[0]

    if(username === '' || password === ''){
        return res.sendStatus(401)
    }else{
        Loginn
        .find({username:username,password:password})
        .exec()
        .then(rows=>{
            // console.log(result)
            if (rows.length == 1){
                var userID = rows[0]._id
                var user = {name:rows[0].username}

                const accessToken=generateAccesstoken(user)

                Loginn
                .findByIdAndUpdate({_id:userID},{token:accessToken})
                .exec()
                .then(results=>{

                    res.status(200).json({
                        'token':accessToken,
                        'username':results._id
                    })
                })
                .catch(err=>{
                    res.status(500).send(err)
                })
            }else{
                console.log('hello im under the water')
                return res.sendStatus(403)
            }
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error: err
              })
        })
    }
})

router.post('/addcampaign',authenticatetoken,(req,res)=>{

    var x = req.body.houses,
    arr=[]
    if(x!==undefined){

        x.forEach(async function(k,v) {
    
            await arr.push({
                housename:k.HouseName,
                houseid:k.houseID
            })
                
          })
    }
    var 
    zone = req.body.zone,
    item = req.body.item,
    count = req.body.count,
    startc = req.body.startc,
    endc = req.body.endc
    console.log(zone)
    if(
        zone&&
        x&&
        item&&
        count&&
        startc&&
        endc !==undefined
        ){
            const query = new campaigns({
                _id:new mongoose.Types.ObjectId,
                zone:zone,
                houses:arr,
                item:item,
                count:count,
                start_c:startc,
                end_c:endc
            })
            query
            .save()
            .then(result=>{
                res.status(200).json(result)
            })
            .catch(err=>{
                res.status(403).json(err)
            })
    }else{
        res.sendStatus(403)
    }

})

router.get('/campaignsfind',authenticatetoken,(req,res)=>{
    campaigns
    .find()
    .exec()
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        res.status(403).json(err)
    })
})

router.post('/housedel',authenticatetoken,(req,res)=>{
    var houseID = req.body.houseid
    if(houseID.constructor == Array){
        if(houseID.length!==0){
            var a=[],b=[]
            for (let i = 0; i < houseID.length; i++) {
                houses
                .findByIdAndRemove({_id:houseID[i]})
                .exec()
                .then(result=>{
                    a.push(result)
                })
                .catch(err=>{
                    b.push(err)
                })
            }
            if(b.length==0){res.status(200).json(a)}
            else if(b.length!==0){res.status(403).json(b)}
            else{res.sendStatus(403)}
        }else{
            res.sendStatus(403)
        }
    }else{
        res.sendStatus(403)
    }
})

router.post('/houseadd',authenticatetoken,(req,res)=>{
    var HouseName=req.body.HouseName,
    HouseZone=req.body.HouseZone,
    addressetxt=req.body.address,
    coordinates=req.body.coordinates,
    road=req.body.road
    if (HouseName&&
        HouseZone&&
        addressetxt&&
        coordinates&&
        road !==undefined)
        {
        
            if(HouseZone=='W'||
            HouseZone=='S'||
            HouseZone=='E'||
            HouseZone=='N') {   
        
                const Houses = new houses({
                    _id:new mongoose.Types.ObjectId,
                    HouseName:HouseName,
                    HouseZone:HouseZone,
                    addresses:{
                        addressetxt:addressetxt,
                        coordinates:coordinates,
                        road:road
                    }
                })

                // console.log(Houses)
                Houses
                .save()
                .then(result=>{
                    res.status(200).json(result)
                })
                .catch(err=>{
                    res.status(500).json(err)
                    console.log(err)
                })
            }else{
                res.sendStatus(403) 
            }

        }else{
            res.sendStatus(403)
        }

})

router.get('/housesfind',authenticatetoken,(req,res)=>{

    var zone = req.query.zone
    if(zone!==undefined){
        houses
        .find({HouseZone:zone})
        .exec()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }else{
        res.sendStatus(403)
    }
})

router.post('/personadd',authenticatetoken,(req,res)=>{
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed)

    var fullname = req.body.fullname,
    nationality = req.body.nationality,
    phonenummber = req.body.phonenummber,
    birthday = req.body.birthday,
    tc = req.body.tc,
    dateadd = `${today.toLocaleDateString()}`,
    sex = req.body.sex,
    note = req.body.note,
    houseid = req.body._id,
    deprmemnt = req.body.deprtement

    if(
        fullname&&
        nationality&&
        phonenummber&&
        birthday&&
        tc&&
        dateadd&&
        sex&&
        note&&
        houseid&&
        deprmemnt
        !==undefined
    ){
        const personadd = new persons({
            _id:new mongoose.Types.ObjectId,
            fullname:fullname,
            nationality:nationality,
            phonenummber:phonenummber,
            birthday:birthday,
            tc:tc,
            dateadd:dateadd,
            sex:sex,
            note:note,
            Priority:'0',
            houseid:houseid,
            deprmemnt:deprmemnt
        })

        personadd
        .save()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            res.status(403).json(err)
        })
    }else{
        res.sendStatus(403)
    }
})

router.post('/personupdate',authenticatetoken,(req,res)=>{
    var 
    id = req.body._id,
    fullname = req.body.fullname,
    nationality = req.body.nationality,
    phonenummber = req.body.phonenummber,
    deprtement = req.body.deprtement,
    birthday = req.body.birthday,
    tc = req.body.tc,
    sex = req.body.sex,
    priority = req.body.priority,
    note = req.body.note

    if(
        id&&
        fullname&&
        nationality&&
        phonenummber&&
        deprtement&&
        birthday&&
        tc&&
        sex&&
        priority&&
        note
        !==undefined
    ){
        persons
        .findByIdAndUpdate(id,{$set:{
            fullname:fullname,
            nationality:nationality,
            phonenummber:phonenummber,
            birthday:birthday,
            tc:tc,
            sex:sex,
            priority:priority,
            deprtement:deprtement,
            note:note

        }})
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            res.status(403).json(err)
        })
    }else{
        res.sendStatus(403)
    }
})

router.get('/personsrequest',authenticatetoken,(req,res)=>{
    var houseid = req.query.houseid
    if(houseid!==undefined){
        persons
        .find({houseid:houseid})
        .exec()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }else{
        res.sendStatus(403)
    }
})

router.get('/personrequest',authenticatetoken,(req,res)=>{
    var personid = req.query.personid
    if(personid!==undefined){
        persons
        .find({_id:personid})
        .exec()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }else{
        res.sendStatus(403)
    }
})

router.post('/addpersonpriority',authenticatetoken,(req,res)=>{
    var personID = req.body.personid
    var priority = req.body.priority
    if(personID!==undefined&&priority!==undefined){
        persons
        .findOneAndUpdate({_id:personID},{Priority:priority})
        .exec()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            res.status(403).json(err)
        })
    }else{
        res.sendStatus(403)
    }

})

router.post('/delperson',authenticatetoken,(req,res)=>{
    var personID = req.body.personid
    if(personID.constructor==Array){
        if(personID.length!==0){
            personID.forEach(function (e,i) {
                persons
                .findByIdAndRemove({_id:e})
                .exec()
                .then(result=>{
                    res.status(200).json(result)
                })
                .catch(err=>{
                    res.status(403).json(err)
                })
            })
        }else{
            res.sendStatus(403)
        }
    }else{
        res.sendStatus(403)
    }
})

router.get('/personhousedata',authenticatetoken,(req,res)=>{

    var houseID = req.query.id

    if(houseID!==undefined){
        houses
        .find({_id:houseID})
        .exec()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            res.status(403).json(err)
        })
    }else{
        res.sendStatus(403)
    }
})
router.get('/housequery',authenticatetoken,(req,res)=>{
    houses
    .find()
    .exec()
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        res.Status(403).json(err)
    })
})

router.post('/addstorge',authenticatetoken,(req,res)=>{
    var 
    type = req.body.type,
    item = req.body.item,
    count = req.body.count,
    entry_date = req.body.Edate,
    release_date = req.body.Rdate,
    note = req.body.note

    if(
        type &&
        item &&
        count &&
        entry_date &&
        release_date &&
        note
        !== undefined
    ){
        const Storge = new storge({
            _id:new mongoose.Types.ObjectId,
            type:type,item:item,count:count,Edate:entry_date,Rdate:release_date,
            note:note
        })

        Storge
        .save()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            res.status(403).json(err)
        })

    }else{ 
        res.sendStatus(403)
    }
})

router.get('/findstorge',authenticatetoken,(req,res)=>{
    var type = req.query.type
    if(type!==undefined){
        storge
        .find({type:type})
        .exec()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            res.status(403).json(err)
        })
    }else{
        res.sendStatus(403)
    }
})

router.get('/report-storge',authenticatetoken,(req,res)=>{

    
    var type = req.query.type

    if(type !==undefined){
        if(type==='A'){
            storge
            .find()
            .exec()
            .then(result=>{
                res.render('storge',{datax:result}) 
            })
            .catch(err=>{
                console.log(err)
            })
        }else if(type==='I'||type==='F'||type==='M'){
            storge
            .find({type:type})
            .exec()
            .then(function(result){  
                res.render('storge',{datax:result})          

            })
            .catch(err=>{
                console.log(err)
            })
        }else{
            res.sendStatus(403)
        }
    }else{
        res.sendStatus(403)
    }
})

router.get('/reportnowcampaign',authenticatetoken,(req,res)=>{
    var m_date = new Date(req.query.Mdate),
    type_date = req.query.type,
    today_date = new Date();
    if(type_date==='NOW'){ 
        console.log(new Date(m_date.getFullYear(),m_date.getMonth(),0))
        if(
            new Date(m_date.getFullYear(), m_date.getMonth(),2)>=
            new Date(today_date.getFullYear(), today_date.getMonth(),2)
            ){
            campaigns
            .find({$and:[
                {'start_c':{$gte:new Date(m_date.getFullYear(),m_date.getMonth(),0)}},
                {'start_c':{$lte:new Date(m_date.getFullYear(),m_date.getMonth()+1,0)}}
            ]})
            .exec()
            .then(result=>{
                if(result === undefined || result.length == 0){
                    res.sendStatus(403)
                }else{
                res.render('campaign',{datax:result}) 
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }else{
            res.sendStatus(403)
        }
    }else if(type_date==='END'){
        if(
            m_date.getFullYear()*(m_date.getMonth()+1)>=
            today_date.getFullYear()*(today_date.getMonth()+1)
        ){
            campaigns
            .find({$and:[
                {'end_c':{$gte:new Date(m_date.getFullYear(),m_date.getMonth(),0)}},
                {'end_c':{$lte:new Date(m_date.getFullYear(),m_date.getMonth()+1,0)}}
            ]})
            .exec()
            .then(result=>{
                if(result === undefined || result.length == 0){
                    res.sendStatus(403)
                }else{
                    res.render('campaign',{datax:result}) 
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }else{
            res.sendStatus(403)
        }
    }else{
        res.sendStatus(403)
    }
    
})






router.get('/reportzone',authenticatetoken,require('./middleware/reportzone'));

router.get('/reporthouse',authenticatetoken,(req,res)=>{
    var houseid=req.query.houseid,houseobj=new Object;
    if(houseid!==undefined||houseid!==null){
        let person = (id)=>{
            return persons
            .find({houseid:id})
            .exec()
            .then(res=>{
                return res;
            })
            .catch(err=>{
                return err;
            })
        }
        houses
        .findById(houseid)
        .exec()
        .then(async(result)=>{
            if(result.constructor!==Array){
                houseobj={};
                let zone=(zone)=>{
                    if(zone=='S'){return zone='South Zone'}
                    else if(zone=='W'){return zone='West Zone'}
                    else if(zone=='N'){return zone='North Zone'}
                    else if(zone=='E'){return zone='East Zone'}}
                houseobj.name=result.HouseName;
                houseobj.zone=zone(result.HouseZone);
                houseobj.addresses=result.addresses;
                houseobj.person=await person(result._id);
                res.render('house',{
                    zone:houseobj.zone,
                    h_name:houseobj.name,
                    address:houseobj.addresses.addresstetxt,
                    coordinates:houseobj.addresses.coordinates,
                    road:houseobj.addresses.road,data:houseobj.person})
            }else{
                res.sendStatus(403);
            }
        })
        .catch(err=>{
            res.status(403).json(err);
        });
    }
})

router.get('/reportpriority',(req,res)=>{
    let zone = req.query.zone,
    nationality= req.query.nationality,
    sex = req.query.sex,
    priority = req.query.priority;
    let person = (obj)=>{
        return persons
        .find(obj)
        .exec()
        .then(result=>{
            return result;
        })
        .catch(err=>{
            return err;
        })
    }
    if(
        zone!==undefined&zone!=='NULL'&&
        nationality!==undefined&nationality!=='NULL'&&
        sex!==undefined&sex!=='NULL'&&
        priority!==undefined&priority!=='NULL'
    ){
        if(priority=='true'){
            priority=1;
        }else if(priority=='false'){
            priority=0;
        }else{
            console.log('ttt'+nationality)
            res.sendStatus(403);
        }
        houses
        .find({HouseZone:zone})
        .exec()
        .then(async(result)=>{
            var arr=[];
            for (let i = 0; i < result.length; i++) {
                var obj={};
                obj.houseid= result[i]._id;
                obj.Priority=priority;
                if(sex!=='ALL'){
                    obj.sex=sex;
                }
                if(nationality!=='HEPSI'){
                    obj.nationality=nationality;
                }
                obj.person = await person(obj);
                obj.housename=result[i].HouseName;  
                arr.push(obj)
            }
            res.render('priority',{
                data:arr,
                zone:zone,
                nationality:nationality,
                sex:sex,
                priority:priority
            })
        })
        .catch(err=>{
            res.status(403).json(err);
        })
    }else{
        res.sendStatus(403)
    }

})










function generateAccesstoken(user) {
    return jwt.sign(user , process.env.ACCESS_TOKEN_SECRET,{expiresIn:'86400s'})
}
function authenticatetoken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null){
        res.sendStatus(401)
    }else{
        Loginn
        .find({token:token})
        .exec()
        .then(result=>{
            if(result.length == 1){
                var DBtoken = result[0].token
                if(token===DBtoken){
                    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
                        if(user==null){
                            res.sendStatus(403)
                        }else{
                            Loginn
                            .find({username:user.name})
                            .exec()
                            .then(result=>{
                                if(result.length==1){
                                    if (err) return res.sendStatus(403)
                                        next();
                                }else{
                                    console.log('error in the token')
                                    res.sendStatus(403)
                                }
                            })
                            .catch(err=>{
                                res.sendStatus(403).json(err)
                            })
                        }
                    })
                }else{
                    res.status(500).json({'err':'the token is not identical'})
                }
            }else{
                res.status(500).json({'err':'the token is not identicallll'})
            }
        })
        .catch(err=>{
            console.log('rows is empty')
            res.status(403).json(err)
        })
    }
}

//  add new user into DB
router.post('/signin',(req,res,next)=>{

    const loginn = new Loginn({
        _id:new mongoose.Types.ObjectId,
        username:req.body.username,
        password:req.body.password
    })
    loginn
    .save()
    .then(result=>{
        console.log(result)
        res.status(201).json({
            message:"handling POST requests",
            createduser:loginn
        })
    })
    .catch(err=>{
        res.status(500).json({
        error: err
      })
    })
    
})
router.get('/s',(req,res)=>{
    houses
    .find({Priority:1})
    .exec()
    .then(ss=>{
        res.status(200).json(ss)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})



module.exports = router