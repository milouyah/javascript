# 
Node.js에서 JavaScript 파일을 실행할 때 커맨드라인 인수를(Argument) 받는 방법은 `process.argv`를 사용하는 것입니다. `process.argv`는 Node.js의 글로벌 객체인 `process`의 속성으로, 명령줄에서 전달된 모든 인수를 배열 형태로 저장합니다.

### 예시

1. `process.argv`는 배열로, 첫 번째 요소는 Node.js의 실행 경로, 두 번째 요소는 실행 중인 스크립트의 경로를 나타냅니다. 세 번째 요소부터는 커맨드라인에서 전달된 인수들입니다.

2. 예를 들어, 아래와 같이 `app.js`라는 파일을 만들고 인수를 받아보겠습니다.

```javascript
// app.js

// process.argv 출력
console.log(process.argv);

// 인수 추출
const args = process.argv.slice(2); // 0번째는 node 경로, 1번째는 파일 경로이므로 2번째부터 인수
console.log('Arguments: ', args);

// 예: 첫 번째 인수를 받아 출력
if (args.length > 0) {
    console.log('First Argument: ', args[0]);
} else {
    console.log('No arguments provided.');
}
```

### 실행 방법

이제 터미널에서 아래와 같이 `app.js`를 실행할 수 있습니다.

```bash
node app.js arg1 arg2 arg3
```

이렇게 실행하면 `process.argv` 배열에는 다음과 같은 값들이 들어갑니다:

```bash
[
  '/usr/local/bin/node',  // Node.js 실행 경로
  '/path/to/app.js',      // 실행 중인 스크립트 파일 경로
  'arg1',                 // 첫 번째 인수
  'arg2',                 // 두 번째 인수
  'arg3'                  // 세 번째 인수
]
```

### 결과 예시

만약 `node app.js hello world`라고 실행하면:

```bash
[
  '/usr/local/bin/node',
  '/path/to/app.js',
  'hello',
  'world'
]

Arguments:  [ 'hello', 'world' ]
First Argument:  hello
```

### 요약

- `process.argv`는 Node.js에서 커맨드라인 인수를 배열로 제공합니다.
- `process.argv[0]`는 Node.js 실행 경로, `process.argv[1]`는 스크립트 파일 경로이고, 그 이후의 값들이 전달된 인수입니다.
- `process.argv.slice(2)`로 인수만 추출할 수 있습니다.