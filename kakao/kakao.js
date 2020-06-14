
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
text = user.text
//[CHECK(END)]

//Body

obj = { 
    object_type: "text", 
    text: text,
    link:{}
};

let body = Querystring['stringify']({  
    template_object: JSON.stringify(obj),
})
//console.log(body);

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

