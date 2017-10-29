function login(obj)
{
    var email = obj.email;
    var username = obj.username;
    var result = true;
    console.log('input are ', username, email);

    if(username == '')
    {
        result = false;
        console.log('no username');
    }
    if(email == '')
    {
        result = false;
        console.log('no email');
    }
    console.log('Validate is', result);
    return result;
}

module.exports = {
    login
}
