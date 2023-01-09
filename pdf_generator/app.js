const PDFDocument = require("./pdfkit-tables");
const fs = require('fs');

function person_print (persons,num,callback){
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
        headers: ["fullname", "nationality", "Phone", "Birthday", "tc", "departement", "dateadd", "sex", "note" ],
        rows: []
    };

    for (const person of persons) {
        table.rows.push([person.fullname, person.nationality, person.phonenummber, person.birthday, person.tc, person.departement, person.dateadd, person.sex, person.note])
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

module.exports = person_print;