const PDFDocument = require("./pdfkit-tables");
const fs = require('fs');

function campaign_print (data,num,callback){
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
        headers: ["item", "count", "date_from", "date_to", "zone", "houses"],
        rows: []
    };
    
    for (const one of data) {
        let x=[];
        for (var name of one.houses){
            x.push(name.HouseName)
        }
        if(one.zone=="E"){
            table.rows.push([one.item, one.count, date_format(one.start_c), date_format(one.end_c), "eastern zone", x])
        } else if(one.zone=="W"){
            table.rows.push([one.item, one.count, date_format(one.start_c), date_format(one.end_c), "western zone", x])
        } else if(one.zone=="S"){
            table.rows.push([one.item, one.count, date_format(one.start_c), date_format(one.end_c), "Southern zone", x])
        } else if(one.zone=="N"){
            table.rows.push([one.item, one.count, date_format(one.start_c), date_format(one.end_c), "Northern zone", x])
        }
    }
    function date_format(e){
        var d = new Date(e).getDate(),
        m = new Date(e).getMonth()+1,
        y = new Date(e).getFullYear()
        return d+'-'+m+'-'+y;
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

module.exports = campaign_print;