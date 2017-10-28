function goLogin()
{
    // document.getElementById('login').classList.add('animated', 'zoomIn');

    document.getElementById('tab-login').classList.add('active');
    document.getElementById('tab-register').classList.remove('active');

    document.getElementById('chat').style.display = 'none';
    document.getElementById('register').style.display = 'none';
    document.getElementById('login').style.display = 'block';
}

function goRegister()
{
    // document.getElementById('register').classList.add('animated', 'zoomIn');

    document.getElementById('tab-register').classList.add('active');
    document.getElementById('tab-login').classList.remove('active');

    document.getElementById('chat').style.display = 'none';
    document.getElementById('register').style.display = 'block';
    document.getElementById('login').style.display = 'none';
}

function goChat()
{
    // document.getElementById('chat').classList.add('animated', 'zoomIn');

    document.getElementById('menu').style.display = 'none';
    document.getElementById('chat').style.display = 'block';
    document.getElementById('register').style.display = 'none';
    document.getElementById('login').style.display = 'none';
}

module.exports = {
    goLogin,
    goRegister,
    goChat
}
