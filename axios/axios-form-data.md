JavaScript에서 `axios`를 사용하여 `FormData`를 전송할 때는 특별한 모듈이 필요하지 않습니다. `axios`와 브라우저의 내장 객체인 `FormData`를 함께 사용하면 됩니다. Node.js 환경에서는 브라우저의 `FormData` 대신 `form-data` 모듈을 사용하여 같은 작업을 수행할 수 있습니다.

### 브라우저 환경에서 `axios`와 `FormData` 사용 예시

브라우저에서 파일이나 폼 데이터를 서버로 전송할 때는 기본적으로 `FormData` 객체를 생성하고 이를 `axios`로 전송할 수 있습니다.

#### 예제:

```javascript
// HTML input 요소에서 파일을 선택하고 이를 FormData로 전송하는 예시
const form = document.querySelector('form');
const fileInput = document.querySelector('input[type="file"]');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append('file', fileInput.files[0]);  // 파일 추가
  formData.append('name', 'John Doe');  // 다른 데이터 추가

  try {
    const response = await axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('Upload successful:', response.data);
  } catch (error) {
    console.error('Upload failed:', error);
  }
});
```

이 코드는 사용자가 파일을 선택하고 폼을 제출하면, `FormData` 객체에 파일과 다른 폼 데이터를 담아 `axios`로 서버에 전송하는 예시입니다.

### Node.js 환경에서 `form-data` 모듈 사용 예시

Node.js 환경에서는 브라우저에서 제공하는 `FormData` 객체가 없으므로, `form-data` 패키지를 사용해야 합니다.

#### 설치:

```bash
npm install form-data
```

#### 예제:

```javascript
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// 새로운 FormData 객체 생성
const formData = new FormData();

// 파일과 다른 데이터를 FormData에 추가
formData.append('file', fs.createReadStream('/path/to/file'));  // 파일 경로 지정
formData.append('name', 'John Doe');

// axios로 FormData 전송
axios.post('http://example.com/upload', formData, {
  headers: {
    ...formData.getHeaders()  // axios에 필요한 FormData 헤더 추가
  }
})
.then(response => {
  console.log('Upload successful:', response.data);
})
.catch(error => {
  console.error('Upload failed:', error);
});
```

이 Node.js 예제에서는 `form-data` 패키지를 사용하여 파일과 데이터를 `FormData` 객체에 추가하고, `axios`를 통해 서버로 전송합니다. `formData.getHeaders()`는 `multipart/form-data` 헤더를 자동으로 설정해 줍니다.

### 요약
- **브라우저 환경**: 브라우저의 내장 `FormData` 객체와 `axios`를 사용하여 데이터를 전송할 수 있습니다.
- **Node.js 환경**: `form-data` 패키지를 설치하고 사용하여 `FormData` 형태로 데이터를 전송할 수 있습니다.
- 두 환경 모두 `axios`의 `Content-Type`을 `multipart/form-data`로 설정하여 데이터를 전송합니다.