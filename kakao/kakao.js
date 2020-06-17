
/*
    Kakao Talk sending message sample.
*/

const axios = require('axios');
const Querystring = require('querystring');

authorization = "";
text = 'This text is from visual code';

//[CHECK(START)]
const user = require('./config.json');
//console.log(user);
//Change authorization value.
authorization = user.authorization;
//[CHECK(END)]

function sendMessage(access_token){
  message = send_msg;
  //Body

  obj = { 
    object_type: "text", 
    text: message,
    link:{}
  };

  let body = Querystring['stringify']({  
    template_object: JSON.stringify(obj),
  })
  //console.log(body);

  if(access_token!=null){
    console.log('access_token:'+access_token);
    authorization = "Bearer "+access_token;
  }

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'authorization': authorization
    }
  }

  url = "https://kapi.kakao.com/v2/api/talk/memo/default/send";
  axios.post(url, body, config)
  //.then(response => console.log(response))
  .then(function(response){
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.data);
  })
  .catch(function (error) {
      console.log(error);
    });
}


function refreshToken(cb){
  url = "https://kauth.kakao.com/oauth/token";
  obj = { 
    grant_type:'refresh_token',
    client_id:user.app_key,
    refresh_token:user.refresh_token
  };

  //console.log(JSON.stringify(obj),null,'\t');
  console.log(JSON.stringify(obj));

  let body = Querystring['stringify'](obj)
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }

  axios.post(url, body, config)
  //.then(response => console.log(response))
  .then(function(response){
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.data);

      cb(response.data.access_token);
      
  })
  .catch(function (error) {
      //console.log(error);
    });  
}

let send_msg;
function send(text){
  send_msg = text
  refreshToken(sendMessage);
}

module.exports = {
  send: send,
}