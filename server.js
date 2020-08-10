let express = require('express');
let app = express();
let moment = require('moment');

//printing logs 
var log = function (logMessage) {
    var time = moment().format()
    console.log('[' + time + ']' + '' + logMessage)
}
//dirrect app to fetch relevent files 
app.use(express.static(__dirname + '/public'));


//set endpoint to html file
app.get('/map', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');

});
//collection to handle messages
let collectionMessages;
//database connection 
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Uber:123A@cluster0.0ncih.mongodb.net/DBSIT725?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });



client.connect(err => {
    collectionMessages = client.db("DBSIT725").collection("messages");
});


//create function message to insert data into db
const InsertMessage=(message)=>{
    collectionMessages.insertOne({message:message})
}


//setting time out 
setTimeout(function(){
    InsertMessage('SETTING TIME OUT')},10000);

//port
let port = 3030;
app.listen(port)
log(' Server listening on http://' + "localhost" + ':' + port)
