//database connection 
const MongoClient = require('mongodb').MongoClient;
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




const uri = "mongodb+srv://Uber:123A@sit725.0ncih.mongodb.net/AssigSIT725?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


//collection to handle messages
let collectionMessage;

client.connect(err => {
    collectionMessage = client.db("AssigSIT725").collection("messages");
});



const insertMessage = (message) => {
    collectionMessage.insertOne({ message: message });
}

const retrieveMessages = (res) => {
    collectionMessage.find().toArray(function (err, result) {
        if (err) throw err;
        res.send(result)
    });
}
app.get('/message', function (req, res) {
    let message = req.query.message
    insertMessage(message)
    res.send('Message added')
})

app.get('/messages', function (req, res) {
    retrieveMessages(res)
})



//port
let port = 3000;
app.listen(port)
log(' Server listening on http://' + "localhost" + ':' + port)
