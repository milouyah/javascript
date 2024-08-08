# express



# Simple server

```javascript
// app.js

const express = require('express');
const app = express();
const port = 3000;

// 기본 경로에 대한 응답 설정
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 사용자 경로에 대한 응답 설정
app.get('/user', (req, res) => {
  res.json({ name: 'John Doe', age: 30 });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

# Links
* [express사용법 총정리](https://m.blob.naver.com/hj_kim97/222913693753)