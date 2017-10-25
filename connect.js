const firebase = require('firebase');

var app = firebase.initializeApp({
    apiKey: "AIzaSyBV7-lsUVMnn61fTpHo8RM8d8tpMkzSRRs",
    authDomain: "cloud-store-91b9e.firebaseapp.com",
    databaseURL: "https://cloud-store-91b9e.firebaseio.com/",
    storageBucket: "gs://cloud-store-91b9e.appspot.com",
});

var database = firebase.database();
var ref = database.ref('users');

module.exports = {
    ref
}
