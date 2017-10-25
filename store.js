var connect = require('./connect.js');

function save(doc)
{
    connect.ref.push(doc).then((result)=> {
        console.log('Entry saved: ', JSON.stringify(doc, undefined, 2));
        return doc;
    }).catch((err)=> {
        console.log(err);
    });
}

module.exports = {
    save
}
