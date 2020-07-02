let axios = require('axios');
let iconv = require('iconv-lite');


function get(cb){
    let url = "https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:005930&_callback=data";
    //let url = "https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:263750|SERVICE_RECENT_ITEM:263750,005930,252670&_callback=data";
    
    axios({
        method:'get',
        url:url,
        responseType: 'arrayBuffer'
      })
        .then((response) => {
            if (response.status === 200) {
    
                let contents = iconv.decode(response.data,'UTF-8').toString();
                //let contents = iconv.decode(response.data,'EUC-KR').toString();
    
                const re = /\(|\)/
                let strs = contents.split(re);
                let json = JSON.parse(strs[1]);
    
    
                let hv = json.result.areas[0].datas[0].hv;
                console.log(hv);
                //console.log(JSON.stringify(json,null,'\t'));

                //CallBack
                cb(hv);
            }
        }, (error) => console.log(err));
}

module.exports = {
    get: get,
}