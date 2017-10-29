function setBackground()
{
    var bgs = [
        'https://lh3.googleusercontent.com/3nIVpOWGLRDEJgbb8kzs_vaBzYlTy2HMFfoNG9xJYG3F5KaptMV7QUUpkgcL789aEXg=h900',
        'https://businessfirstfamily.com/wp-content/uploads/2017/02/technology-background-build-app-1024x583.jpg',
        'http://www.parkett-wohnwelt.de/gfx/items2013/hires/000/010/449/7877028.jpg',
        'http://www.premierforkids.com/wp-content/uploads/2015/05/Jungle-Background-1024x440.jpg'
    ];
    var index = 0;

    setInterval(function() {
        index++;
        if(index == bgs.length)
        {
            index = 0;
        }
        document.body.style.backgroundImage = `url(${bgs[index]})`;
    }, 15000);
}

module.exports = {
    setBackground
}
