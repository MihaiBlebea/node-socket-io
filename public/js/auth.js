const router = require('./clientRouter.js');
const avatar = require('./avatar.js');

function registerUser()
{
    console.log('register function');
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    axios.post('store/user', {
        username: username,
        email: email
    }).then((response)=> {

    }).catch((err)=> {
        console.log(err);
    });
}

function loginUser()
{
    console.log('login function');
    var username = document.getElementById('login-username').value;
    var email = document.getElementById('login-email').value;
    axios.post('/login', {
        username: username,
        email: email
    }).then((response)=> {
        if(response.data == true)
        {
            avatar.setAvatar(username);
            avatar.getAvatar();
            router.goChat();
            storeInSession(true);
        }
    }).catch((err)=> {
        console.log(err);
    });
}

function storeInSession(login)
{
    return sessionStorage.login = (login == true) ? true : false;
}

function getFromSession()
{
    return sessionStorage.login;
}

module.exports = {
    registerUser,
    loginUser,
    storeInSession,
    getFromSession
}
