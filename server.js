const http = require('http');
const app = require('./app.js');

var server = http.createServer(app);

module.exports = server;
