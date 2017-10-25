function get()
{
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();

    return day + '-' + month + '-' + year + ' ' + hour + ':' + minute + ':' + second;
}

module.exports = {
    get
}
