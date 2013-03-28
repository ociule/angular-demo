var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var socket = require('./socket.js');

server.listen(8000);

app.use("/", express.static(__dirname + '/app'));

// assuming io is the Socket.IO server object
if (process.env.HEROKU) {
    // See https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku
    io.configure(function () { 
      io.set("transports", ["xhr-polling"]); 
      io.set("polling duration", 10); 
    });
}
io.sockets.on('connection', socket);
