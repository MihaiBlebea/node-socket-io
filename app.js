const express = require('express');
const http = require('http');
const path = require('path');
const moment = require('moment');
const socketIO = require('socket.io');

const connect = require('./connect.js');
const store = require('./store.js');
const time = require('./time');

const publicPath = path.join(__dirname, 'public');
console.log(publicPath);

// App init
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// Set up middleware
app.use('*', express.static(publicPath));


// Socket events
io.on('connection', function(socket) {
    console.log('New user connected');

    // Send new message to the browser
    socket.emit('newMessage', {
        from: 'Server',
        to: 'Browser',
        text: 'Hey browser! How are you?',
        createdAt: time.get()
    });

    socket.on('createMessage', function(message) {
        console.log('MEssage received', JSON.stringify(message, undefined, 2));
    });

    // Client was disconnected from the server
    socket.on('disconnect', function() {
        console.log('User was disconnected');
    });
});

// Set up routes
app.get('/', function(request, response) {
    console.log(request);
    response.send('Home page');
});

// Get all users
app.get('/get', function(request, response) {
    connect.ref.on('value', function(data) {
        response.json(data.val());
    }, function(err) {
        console.log('Sorry! Something went wrong');
    });
});

// Get specific users
app.get('/get/:name', function(request, response) {
    var name = request.params.name;
    connect.ref.orderByChild("firstName").equalTo(name).once("value", function(data) {
        response.json(data.val());
    });
});

// Store a new user
app.get('/store/user', function(request, response) {
    console.log(request.query.first);
    if(request.query.first !== undefined && request.query.last !== undefined && request.query.phone !== undefined && request.query.email !== undefined)
    {
        var doc = {
            firstName: request.query.first,
            lastName: request.query.last,
            phone: request.query.phone,
            email: request.query.email
        };
        connect.ref.push(doc).then((result)=> {
            console.log('Entry saved: ', JSON.stringify(doc, undefined, 2));
            response.json(doc);
        }).catch((err)=> {
            console.log(doc);
        });
    } else {
        console.log('No params passed');
    }
});


// Set up port to listen
server.listen(3000, function() {
    console.log('Started app on port 3000');
});
