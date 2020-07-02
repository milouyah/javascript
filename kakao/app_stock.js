const stock = require('./stock.js');
const kakao = require('./kakao.js');

let cb = function(text){
    console.log('TEXT:'+text);
    kakao.send('Samsung:'+text);
}

stock.get(cb);