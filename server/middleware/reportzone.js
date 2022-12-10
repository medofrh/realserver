// eslint-disable-next-line no-undef
const houses = require('../models/houses');
// eslint-disable-next-line no-undef
const persons = require('../models/persons');

const personquery = async (houseid)=>{
    return persons.find({houseid:houseid}).exec().then((r)=>{
       return r;
    }).catch((e)=>{
        console.log(e);
    });
}
// eslint-disable-next-line no-undef
module.exports = (req,res)=>{

    var z = req.query.zone;
    if(z!==undefined||z=='S'||z=='W'||z=='E'||z=='N'){
        houses
        .find({HouseZone:z})
        .exec()
        .then(async(result)=>{
            const resArray = [];

            for(let i=0;i<result.length;i++){
                const hoseResult = {};
                var len =await personquery(result[i]._id);
                hoseResult._id = result[i]._id;
                hoseResult.houseName = result[i].HouseName;
                hoseResult.houseZone= result[i].HouseZone;
                hoseResult.addresses= result[i].addresses;
                hoseResult.personCount= len.length;
                resArray.push(hoseResult);
            }
            res.render('zone',{datax:resArray}) 

        })
        .catch((err=>{
            console.log(err+'aaa')
            res.status(403).json(err)
        }));
    }else{
        res.sendStatus(403)
    }



}