var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var socket = require('./socket.js');

var port = process.env.PORT || 8000;
server.listen(port);

app.use("/", express.static(__dirname + '/app'));

// assuming io is the Socket.IO server object
if (process.env.NO_WEBSOCKETS) {
    console.log("Configuring socket.io server for Heroku (No true websockets, replace with xhr-longpolling");
    // See https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku
    io.configure(function () { 
      io.set("transports", ["xhr-polling"]); 
      io.set("polling duration", 10); 
    });
}
io.sockets.on('connection', socket);
