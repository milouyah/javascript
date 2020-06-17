const currency = require('./currency.js');
let cb = function(data){
    console.log('[CB]\n'+JSON.stringify(data,null,'\t'));
};
currency.update_currency(cb);