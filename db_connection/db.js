const mongoose = require ('mongoose');

mongoose.connect('mongodb://medo:M6e3d3o6@192.168.1.225:27017/medo?connectTimeoutMS=1000&authSource=admin');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("the connection is open!");
});

module.exports = function close_connection() {
    mongoose.connection.close();
    console.log("DB has been closed :)");
};