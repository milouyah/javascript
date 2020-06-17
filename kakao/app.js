const currency = require('./currency.js');
const kakao = require('./kakao.js');

let cb = function(text){
    console.log('TEXT:'+JSON.stringify(text));
    kakao.send(JSON.stringify(text,null,'\t'));
}

currency.update_currency(cb);