let express=require('express');
const mongoose = require('mongoose');
let app=express();
let moment=require('moment');


var log=function(message){
    var time=moment().format()
    console.log('['+time+']' +''+ message)
}

app.use(express.static(__dirname+'/public'));



app.get('/map', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');

});






let port=3030;
app.listen(port)
log(' Server listening on port '+port)