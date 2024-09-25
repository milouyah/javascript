`axios`에서 프록시(proxy)를 설정하려면, `axios` 요청의 설정 객체에 `proxy` 속성을 추가하면 됩니다. 프록시 설정은 `HTTP`와 `HTTPS` 요청 모두에 사용할 수 있습니다.

### 기본 프록시 설정 방법

```javascript
const axios = require('axios');

const instance = axios.create({
  proxy: {
    host: '127.0.0.1',  // 프록시 서버 주소
    port: 9000,         // 프록시 서버 포트
    auth: {             // 프록시에 인증이 필요한 경우
      username: 'proxyuser',
      password: 'proxypass'
    }
  }
});

instance.get('https://example.com')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### 프록시 설정의 주요 요소

- `host`: 프록시 서버의 호스트 주소(IP 또는 도메인).
- `port`: 프록시 서버가 사용하는 포트 번호.
- `auth`: 프록시에 인증이 필요한 경우, 사용자명과 비밀번호를 설정할 수 있습니다.

### 환경 변수로 프록시 설정

환경 변수를 이용해서도 프록시 설정을 할 수 있습니다. 예를 들어, `http_proxy`나 `https_proxy` 같은 환경 변수를 설정하면 자동으로 프록시를 사용할 수 있습니다.

#### 환경 변수 설정 예시:

```bash
export http_proxy=http://127.0.0.1:9000
export https_proxy=https://127.0.0.1:9000
```

이런 환경 변수를 설정한 후 `axios`는 자동으로 이 프록시 설정을 사용할 수 있습니다.

### 프록시 없이 요청하기

만약 특정 요청에서 프록시를 사용하지 않으려면, `proxy: false`로 설정할 수 있습니다.

```javascript
axios.get('https://example.com', {
  proxy: false  // 프록시를 사용하지 않도록 설정
})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### 요약
- `axios` 요청에서 `proxy` 속성을 통해 프록시 설정을 추가할 수 있습니다.
- 인증이 필요한 프록시의 경우, `auth` 객체를 추가하여 사용자명과 비밀번호를 설정할 수 있습니다.
- 특정 요청에서 프록시를 비활성화하려면 `proxy: false`로 설정합니다.
