var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Define folders so we can link external files html file GET requests
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/js'));

var sockets = [];

// Format: { "roomName":[hostUser, 'otherUser1', 'otherUser2'], }
var rooms = [];

function connect(socket){
	//console.log('User ' + socket.id + ' connected!');
	sockets.push(socket);
}

function disconnect(socket){
	//console.log('User ' + socket.id + ' disconnected!');
	var index = sockets.indexOf(socket);
	sockets.splice(index, 1);
	// if last in room remove room
}

function joinRoom(socket, room){
	socket.join(room);
	console.log(socket.id + ' joined ' + room);
	socket.emit();
}

// Register events for a new socket
io.on('connection', (socket) => {
	connect(socket);
	socket.on('disconnect', () => {disconnect(socket);});
	socket.on('joinRoomRequest', (room) => {joinRoom(socket, room);});
});

// Root page
app.get('/*', function(req, res){
	res.sendFile(__dirname + '/setup.html');
});

// Start server
http.listen(80, function(){
	console.log('listening on *:3000');
});
