const PDFDocument = require("./pdfkit-tables");
const fs = require('fs');
module.exports = {
    "house_print" : function house_print (houses,num,callback){
        const address = "MAVİ KELEBEK UÖD KemerkOpru Mah. Sadirvan Cad. Kulaklar is merkezi no: 5 Turkey, bartin 74100";
        // Create a document
        const doc = new PDFDocument({size: 'A4'});
        const writeStream = fs.createWriteStream(`./pdf/${num}.pdf`);
        
        // Import font
        doc.registerFont('Roboto','pdf_generator/Roboto-Light.ttf');
                            /*** Header ***/
        // set logo and the text beside the logo
        doc
        .image('./pdf_generator/logo.png', 10, 20, {fit:[100,100]})
        .fontSize(20)
        .font('Roboto')
        .text('Mavi Kelebek', 100, 45,{align:'left'})
        .text('Bartin', 100, 70,{align:'left'});
        // set address
        doc.fontSize(11).font('Roboto').text(address, 425,45,{
            columns:4,
            height:85,
            width:650,
            align:'left'
        });
                            /*** End header ***/

        const table = {
            headers: ["`HouseName`", "Zone", "address", "coordinates", "road" ],
            rows: []
        };

        for (const house of houses) {
            table.rows.push([house.HouseName, house.HouseZone, house.addresses.addressetxt, house.addresses.coordinates, house.addresses.road])
        }

        doc.table(table, 10, 130, { width: 590}).font('Roboto');

        doc.pipe(writeStream);
        writeStream.on('finish',() => {
            writeStream.close();
            callback();
        })
        // delete file after callback
        writeStream.on('close',()=>{
            try {
                fs.unlinkSync(`./pdf/${num}.pdf`);
                } catch (error) {
                    console.error('there was an error:', error.message);
                }
        })
        writeStream.on('error', (error) => {
            console.error(error);
        });
        
    // Finalize PDF file
        doc.end();
    },
    "house_priority_print" : function house_priority_print (data,query,num,callback){
        
        const address = "MAVİ KELEBEK UÖD KemerkOpru Mah. Sadirvan Cad. Kulaklar is merkezi no: 5 Turkey, bartin 74100";
        // Create a document
        const doc = new PDFDocument({size: 'A4'});
        const writeStream = fs.createWriteStream(`./pdf/${num}.pdf`);
        
        // Import font
        doc.registerFont('Roboto','pdf_generator/Roboto-Light.ttf');
                            /*** Header ***/
        // set logo and the text beside the logo
        doc
        .image('./pdf_generator/logo.png', 10, 20, {fit:[100,100]})
        .fontSize(20)
        .font('Roboto')
        .text('Mavi Kelebek', 100, 45,{align:'left'})
        .text('Bartin', 100, 70,{align:'left'});
        // set address
        doc.fontSize(11).font('Roboto').text(address, 425,45,{
            columns:4,
            height:85,
            width:650,
            align:'left'
        });
                            /*** End header ***/

        const table = {
            headers: ["fullname", "nationality", "Phone", "Birthday", "tc", "departement", "person.houseid.HouseName", "sex", "note" ],
            rows: []
        };

        for (const person of data) {
            console.log(person)
            if(person.houseid!=null){
                if(person.Priority==query.priority){
                    if(person.sex==query.sex){
                        table.rows.push([person.fullname, person.nationality, person.phonenummber, person.birthday, person.tc, person.departement, person.houseid.HouseName, person.sex, person.note])
                    }else if(query.sex == "ALL"){
                        table.rows.push([person.fullname, person.nationality, person.phonenummber, person.birthday, person.tc, person.departement, person.houseid.HouseName, person.sex, person.note])
                    }
                }
            }
        }

        doc.table(table, 10, 130, { width: 590}).font('Roboto');

        doc.pipe(writeStream);
        writeStream.on('finish',() => {
            writeStream.close();
            callback();
        })
        // delete file after callback
        writeStream.on('close',()=>{
            try {
                fs.unlinkSync(`./pdf/${num}.pdf`);
                } catch (error) {
                    console.error('there was an error:', error.message);
                }
        })
        writeStream.on('error', (error) => {
            console.error(error);
        });
        
    // Finalize PDF file
        doc.end();
    }
}