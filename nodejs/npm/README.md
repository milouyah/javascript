# npm

npm에서 프록시 설정을 하려면 다음 명령어들을 사용할 수 있습니다:

1. HTTP 프록시 설정:

npm config set proxy http://your-proxy-server:port


2. HTTPS 프록시 설정:

npm config set https-proxy http://your-proxy-server:port



your-proxy-server와 port 부분을 실제 프록시 서버의 주소와 포트 번호로 변경해 주세요. 예를 들어, 프록시 서버가 proxy.example.com이고 포트가 8080이라면:

npm config set proxy http://proxy.example.com:8080
npm config set https-proxy http://proxy.example.com:8080

프록시 설정을 확인하려면 다음 명령어를 사용할 수 있습니다:

npm config get proxy
npm config get https-proxy

설정을 제거하려면:

npm config delete proxy
npm config delete https-proxy


## npm config (.npmrc)

* Proxy

```bash
$ npm config set cafile [cafile-path]
$ npm config set proxy http://[]
$ npm config set https-proxy https:/[]
$ npm config set strict-ssl false
$ npm config set registry http://registry.npmjs.org/ # optional
```

```bash
# List configurations
$ npm config list
```