function setAvatar(avatar)
{
    // var avatar = document.getElementById('avatar').value;
    localStorage.setItem('avatar', avatar);
    return localStorage.getItem('avatar');
}

function getAvatar()
{
    var avatar = localStorage.getItem('avatar');
    document.getElementById('avatar').innerHTML = avatar;
    return avatar;
}

module.exports = {
    setAvatar,
    getAvatar
}
