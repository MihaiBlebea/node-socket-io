const moment = require('moment');

const connect = require('./connect.js');
const app = require('./app.js');
const server = require('./server.js');
const io = require('./socketIo.js')
const router = require('./router.js');

const port = process.env.PORT || 3000;

// Set up port to listen
server.listen(port, function() {
    console.log('Started app on port', port);
});
