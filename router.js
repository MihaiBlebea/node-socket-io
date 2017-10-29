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
    connect.ref('users').once('value', function(result) {
        var data = result.val();
        var keys = Object.keys(data);
        var exist = keys.indexOf(request.body.username);
        if(exist == -1)
        {
            connect.ref(`users/${request.body.username}`).set({
                email: request.body.email
            }).then((result)=> {
                // console.log(result);
                response.json(true);
            }).catch((err)=> {
                console.log(err);
            });
        } else {
            console.log('username already exists');
            response.json(false);
        }
    });
});

app.post('/login', function(request, response) {
    connect.ref('users').once('value', function(result) {
        var data = result.val();
        if(data[request.body.username] !== undefined)
        {
            if(request.body.email == data[request.body.username]['email'])
            {
                response.json(true);
            } else {
                response.json(false);
            }
        } else {
            response.json(false);
        }
    })
});

module.exports = app;
