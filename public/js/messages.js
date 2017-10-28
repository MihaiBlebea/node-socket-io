const socket = require('socket.io-client')();
const avatar = require('./avatar');
const event = require('./events');
const time = require('./../../time.js');

var talks = [];

function sendType()
{
    socket.emit('type', {
        user: avatar.getAvatar(),
        type: true,
        createdAt: time.get()
    });
}

function send()
{
    var mess = document.getElementById('user-message').value;
    if(avatar.getAvatar() !== "")
    {
        if(mess !== "")
        {
            socket.emit('createMessage', {
                from: avatar.getAvatar(),
                to: 'all',
                text: mess,
                createdAt: time.get()
            });
            document.getElementById('user-message').value = '';
        }
    } else {
        triggerError('Please select an alias name first', 'error');
    }
}

function receive(message)
{
    talks.push(message);
    displayTalks();
}

function displayTalks()
{
    var out = '';
    for(var i = 0; i < talks.length; i++)
    {
        if(talks[i].from == avatar.getAvatar())
        {
            out += `<div class="bubbly ${(i == talks.length - 1)? 'animated fadeIn' : ''} speech-bubble-me"><small>${talks[i].createdAt.split(' ')[1]}</small>: ${talks[i].text}</div>`;
        } else {
            out += `<div class="bubbly ${(i == talks.length - 1)? 'animated fadeIn' : ''} speech-bubble-you"><small>${talks[i].createdAt.split(' ')[1]}</small>: ${talks[i].text}</div>`;
        }
    }
    out += '<a id="final"></a>';
    document.getElementById('talks').innerHTML = out;
    window.location.href = "#final";
}

function displayTyping(type)
{
    if(type.user !== avatar.getAvatar())
    {
        var display = document.getElementById('isType');
        display.innerHTML = type.user + ' is typing';
        display.style.visibility = 'visible';
        setTimeout(function() {
            display.innerHTML = '';
            display.style.visibility = 'hidden';
        }, 2000);
    }
}

module.exports = {
    send,
    sendType,
    receive,
    displayTalks,
    displayTyping
}
