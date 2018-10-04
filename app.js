var express = require('express');
var http = require('http');
var path = require("path");
var io = require('socket.io');
var bodyParser = require('body-parser')
var express = require('express');
var currplayer = 0;
var appTempo = 340;
var userID = 0;
var playerAmount = 0;
var globalbarType = 0;
var currtimesec = 30;
var currtimemin = 0;
var currtimesecrev = 0;
var currtimesminrev = 0;

var currPlayers = [];
var currPlayerColor = [];


var app = express();
var server  = http.createServer(app);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


var width = 16;
var height = 16;
var seqarraystate = [];


var port = process.env.PORT || 3000;


var tcom = require('thesaurus-com');


function init(){
}

init();


app.get('/GetGridSize', function(req,res){
  res.setHeader('Content-Type', 'application/json');
  var obj = {
    "array": seqarraystate,
    "width": width,
    "height": height,
    "userNumber": userID
  }
  res.send(obj)
});


var server = app.listen(port, function () {
  console.log('Example app listening on port 3000!')
});





var sockets = io(server);
// configure socket handlers
sockets.on('connection', function(socket){

  // send current state to this client that connected only

  // sockets.emit('sendSteps', seqarraystate);
  console.log('emmiting array to new user')

  //Hi this is all the users connected

  sockets.emit('usercount', sockets.engine.clientsCount);
  //console.log('User num: ', sockets.engine.clientsCount);

  ////stepsreset


  socket.on('login', function(data){
    console.log(data.userId + ' connected');

  });

  sockets.emit('playerColors', currPlayerColor);


  socket.send(socket.id);



  console.log('a user connected',socket.id);


  socket.on('sendStep', function(data){

  });

  socket.on('sendGesture', function(data){

    // sockets.emit('sendAntonym', antonymArr);

  });


  //console.log('a user connected',socket.id);
  socket.on('ClientReset', function(resetfromclient){

  });



  socket.on('disconnect', function(){


    sockets.emit('playerColors', currPlayerColor);
    sockets.emit('usercount', sockets.engine.clientsCount);

  });
});
