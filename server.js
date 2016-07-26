var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Define folders so we can link external files html file GET requests
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/js'));

//var todo = io.sockets.clients();
//var usethese = io.sockets.clients('room'); // all users from room `room`

function connect(socket){
	//console.log('User ' + socket.id + ' connected!');
}

function disconnect(socket){
	//console.log('User ' + socket.id + ' disconnected!');
}

function joinRoom(socket, room){
	console.log(socket.id + ' joined ' + room);
	socket.join(room);
	socket.emit('joinRoomResponse', room);
}

// Register events for a new socket
io.on('connection', (socket) => {
	connect(socket);
	socket.on('disconnect', () => {disconnect(socket);});
	socket.on('joinRoomRequest', (room) => {joinRoom(socket, room);});
});

// TODO figure out rooms and url

// Every page not the root
//app.get('/*', function(req, res){
//	res.sendFile(__dirname + '/game.html');
//});

// Root page
app.get('/', function(req, res){
	res.sendFile(__dirname + '/setup.html');
});

// Start server
http.listen(80, function(){
	console.log('listening on *:3000');
});
