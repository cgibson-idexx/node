var socket = io();

var room = document.getElementById('room');
var button = document.getElementById('button');

button.addEventListener('click', () => {
	console.log('Attempting to join room ' + room.value + '...');
	socket.emit('joinRoomRequest', room.value);
	button.disabled = true;
});
