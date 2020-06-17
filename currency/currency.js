const axios = require('axios');
const queryString = require('queryString');
const sf = require('sf');
const user = require('./config.json');

/*
(요청) https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=XBiH995gseoSr1IhrorvXe4KlWpOVMbg&searchdate=20180102&data=AP01
(응답) [
    {"result":1,
    "cur_unit":"AED",
    "ttb":"288.78",
    "tts":"294.61",
    "deal_bas_r":"291.7",
    "bkpr":"291",
    "yy_efee_r":"0",
    "ten_dd_efee_r":"0",
    "kftc_bkpr":"291",
    "kftc_deal_bas_r":"291.7",
    "cur_nm":"아랍에미리트 디르함"},
    ,...
    ]
RESULT	Integer	조회 결과
CUR_UNIT	String	통화코드
CUR_NM	String	국가/통화명
TTB	String	전신환(송금) 받으실때
TTS	String	전신환(송금) 보내실때
DEAL_BAS_R	String	매매 기준율
BKPR	String	장부가격
YY_EFEE_R	String	년환가료율
TEN_DD_EFEE_R	String	10일환가료율
KFTC_DEAL_BAS_R	String	서울외국환중계
매매기준율
KFTC_BKPR	String	서울외국환중계
장부가격  
*/

//Today
var date = new Date();
var dd = String(date.getDate()).padStart(2, '0');
var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = date.getFullYear();
var today = yyyy+ mm +  dd;
console.log('today:'+today);
//test(start)
//today='20200612';
//test(end)

//Query
const querys={
  authkey:user.currency_authkey,
  searchdate:today,
  data:'AP01'
};
//console.log(queryString.stringify(querys));

const options = {
    hostname: 'www.koreaexim.go.kr',
    path: '/site/program/financial/exchangeJSON',
    querystring: queryString.stringify(querys),
};


//JavaScrpt Map
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
function parse_response(response, cb){
    // console.log(response.status);
    // console.log(response.statusText);
    let data = new Map();

    for(d of response.data){
        //console.log(sf("Unit:{0}",d.cur_unit));
        if(d.cur_unit==='USD'){
            data['usd'] = d.deal_bas_r;
        }else if(d.cur_unit==='JPY(100)'){
            data['jpy'] = d.deal_bas_r;
        }else if(d.cur_unit==='EUR'){
            data['eur'] = d.deal_bas_r;
        }else if(d.cur_unit==='CAD'){
            data['cad'] = d.deal_bas_r;
        }
    }
    //console.log(data);
    cb(data);
}

function update_currency(cb){
    //URL String
    var urlstring = sf("https://{hostname}{path}?{querystring}",options);
    //console.log(urlstring);
    axios.get(urlstring)
        //.then((response)=>console.log(response))
        .then(( res ) => {
            parse_response(res, cb)  // method call to method2 
        })
        .catch((error)=>console.log(error))
        .finally(()=>console.log('###Finish###'));
}

module.exports = {
    update_currency: update_currency,
}
