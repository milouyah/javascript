
const axios = require('axios');


function get(){
  axios.get('http://www.daum.net')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
}

// set response  type
function get2(){
  axios({
    method:'get',
    url:'http://www.daum.net',
    responseType: 'stream'
  })
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
}

//get();
get2();

