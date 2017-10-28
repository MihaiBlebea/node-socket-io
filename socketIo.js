const server = require('./server');
const socketIO = require('socket.io');
const time = require('./time.js');

var io = socketIO(server);

io.on('connection', function(socket) {
    console.log('New user connected');

    socket.on('createMessage', function(message) {
        console.log('Message received', JSON.stringify(message, undefined, 2));
        io.emit('newMessage', {
            from: message.from,
            to: message.to,
            text: message.text,
            createdAt: time.get()
        });
    });

    socket.on('type', function(type) {
        console.log(type.user, ' is typeing');
        io.emit('newType', {
            user: type.user,
            type: true,
            createdAt: time.get()
        });
    })

    // Client was disconnected from the server
    socket.on('disconnect', function() {
        console.log('User was disconnected');
    });
});

module.exports = io;
