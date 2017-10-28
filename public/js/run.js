const socket = require('socket.io-client')();
const event = require('./events.js');
const time = require('./../../time.js');
const avatar = require('./avatar.js');
const message = require('./messages');
const router = require('./clientRouter.js');
const auth = require('./auth.js');

var talks = [];
var focusInterval;

// (auth.getFromSession == true) ? router.goChat() : router.goLogin();
(auth.getFromSession() == 'true') ? router.goChat() : router.goLogin();

event.setFocus();
avatar.getAvatar();

// window.document.addEventListener('load', function() {
//     (auth.getFromSession() == true) ? router.goChat() : router.goLogin();
// });

var register = document.getElementById('button-register');
register.addEventListener('click', auth.registerUser);

var login = document.getElementById('button-login');
login.addEventListener('click', auth.loginUser);

var tabRegister = document.getElementById('tab-register');
tabRegister.addEventListener('click', router.goRegister);

var tabLogin = document.getElementById('tab-login');
tabLogin.addEventListener('click', router.goLogin);


var avatarInput = document.getElementById('avatar');
avatarInput.addEventListener('keyup', avatar.setAvatar);

var messageInput = document.getElementById('user-message');
messageInput.addEventListener('keyup', message.sendType);
messageInput.addEventListener('keypress', event.handle);

var sendButton = document.getElementById('send-button');
sendButton.addEventListener('click', message.send);

// Get the avatar name from local storage
// avatar.getAvatar();

function triggerError(message, type)
{
    if(type == 'error')
    {
        document.getElementById('error').innerHTML = message;
        document.getElementById('error').style.display = 'block';
        document.getElementById('avatar').classList.add('is-invalid', 'animated', 'tada');
    }

    setTimeout(function() {
        document.getElementById('avatar').classList.remove('is-invalid', 'animated', 'tada');
        document.getElementById('error').style.display = 'none';
    }, 5000);
}

socket.on('disconnect', function() {
    console.log('Disconected from server');
});

// Receive message from server
socket.on('newMessage', function(payload) {
    // console.log('New message from Server', JSON.stringify(payload, undefined, 2));
    message.receive(payload);
});

// If true means somebody is typeing
socket.on('newType', function(type) {
    console.log(type.user, ' started typing');
    message.displayTyping(type);
});
