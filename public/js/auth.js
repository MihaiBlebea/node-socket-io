const router = require('./clientRouter.js');
const avatar = require('./avatar.js');
const error = require('./error.js');
const validate = require('./validate.js');

function registerUser()
{
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var val = validate.login({
        username: username,
        email: email
    });

    if(val == true)
    {
        axios.post('store/user', {
            username: username,
            email: email
        }).then((response)=> {
            if(response.data == false)
            {
                console.log('show error', response.data);
                error.trigger('register-error', 'Username is already in use. Please choose another one', 'danger');
            } else {
                console.log('go to login');
                router.goLogin();
                error.trigger('login-error', 'You have created a new account. Now it\'s time to login', 'success');
            }
        }).catch((err)=> {
            console.log(err);
        });
    } else {
        error.trigger('register-error', 'Details are incomplete...', 'danger');
    }

}

function loginUser()
{
    console.log('login function');
    var username = document.getElementById('login-username').value;
    var email = document.getElementById('login-email').value;

    var val = validate.login({
        username: username,
        email: email
    });

    if(val == true)
    {
        axios.post('/login', {
            username: username,
            email: email
        }).then((response)=> {
            console.log(response.data);
            if(response.data == true)
            {
                avatar.setAvatar(username);
                avatar.getAvatar();
                router.goChat();
                storeInSession(true);
            } else {
                error.trigger('login-error', 'Invalid credentials', 'danger');
            }
        }).catch((err)=> {
            console.log(err);
        });
    } else {
        error.trigger('login-error', 'Details are incomplete...', 'danger');
    }
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
