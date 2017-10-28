const app = require('./app.js');
const connect = require('./connect.js');
const store = require('./store.js');

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
app.post('/store/user', function(request, response) {
    var doc = {
        username: request.body.username,
        email: request.body.email
    };
    connect.ref('users').push(doc).then((result)=> {
        console.log('Entry saved: ', JSON.stringify(doc, undefined, 2));
        response.json(doc);
    }).catch((err)=> {
        console.log(doc);
    });
});

app.post('/login', function(request, response) {
    connect.ref('users').orderByChild('username').equalTo(request.body.username).on('child_added', function(snapshot) {
        // console.log('email client', request.body.email);
        // console.log('email server', snapshot.val().email);
        response.send((request.body.email == snapshot.val().email) ? true : false);
    });
});

module.exports = app;
