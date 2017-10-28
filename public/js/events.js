const message = require('./messages');

function handle(e)
{
    if(e.keyCode === 13)
    {
        e.preventDefault();
        message.send();
    }
}

function setFocus()
{
    setInterval(function() {
        document.getElementById('user-message').focus();
    },10);
}

function loseFocus()
{
    clearInterval(focusInterval);
}

module.exports = {
    handle,
    setFocus,
    loseFocus
}
