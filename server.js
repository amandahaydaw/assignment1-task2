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


//port
let port = 3000;
app.listen(port)
log(' Server listening on http://' + "localhost" + ':' + port)
