
let str = "(abc)(def)";
//or |
let re = /\(|\)/
let splitted = str.trim().split(re);
console.log('splitted:',splitted);