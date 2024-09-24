`getHeaders()` 메서드는 `form-data` 라이브러리에서 제공하는 것이며, 이를 사용하려면 `form-data` 패키지를 설치하고 사용해야 합니다. 하지만 예제 코드에서는 `FormData`가 브라우저에서 제공되는 `FormData` API와 혼동될 수 있습니다. Node.js에서는 브라우저의 `FormData` 대신 `form-data` 라이브러리를 사용해야 합니다.

`getHeaders()`가 없는 이유는 `FormData`가 Node.js에서 지원되는 방식과 다르기 때문입니다. 따라서, Node.js에서 파일을 업로드할 때는 `form-data` 패키지를 사용해야 합니다.

### 해결 방법: `form-data` 패키지 사용

먼저, `form-data` 패키지를 설치해야 합니다.

```bash
npm install form-data
```

그 후, 아래와 같이 코드를 수정할 수 있습니다:

### 수정된 `sendZipFile` 함수
```javascript
const fs = require('fs-extra');
const FormData = require('form-data');
const axios = require('axios');

// ZIP 파일을 POST로 전송하는 함수
async function sendZipFile(url, filePath) {
  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePath));  // 파일 스트림 추가

  try {
    const response = await axios.post(url, formData, {
      headers: {
        ...formData.getHeaders(),  // form-data에서 헤더 가져오기
      },
    });
    console.log('File uploaded successfully:', response.data);
  } catch (err) {
    console.error('File upload failed:', err.message);
  }
}
```

### 코드 설명:

1. **`form-data` 라이브러리 사용**: Node.js에서는 브라우저에서 제공하는 `FormData` API 대신, `form-data` 라이브러리를 사용해야 합니다.
2. **`formData.getHeaders()`**: `axios`에서 POST 요청을 보낼 때는 적절한 `multipart/form-data` 헤더를 설정해야 합니다. `form-data` 라이브러리의 `getHeaders()` 메서드를 사용하여 이 헤더를 가져올 수 있습니다.
3. **`fs.createReadStream()`**: ZIP 파일을 스트림으로 읽어서 `formData`에 추가하고, 이를 POST 요청의 본문으로 전송합니다.

### 결론

Node.js에서 `FormData`를 사용할 때는 브라우저 API 대신 `form-data` 패키지를 사용하는 것이 중요합니다. 이 방식으로 수정하면 `getHeaders()` 에러가 해결되고, 파일 업로드가 정상적으로 동작할 것입니다.

#


JavaScript (Node.js)를 사용하여 폴더를 읽고, 그 폴더의 내용을 ZIP 파일로 묶은 후 이를 HTTP POST 요청으로 전송하는 방법을 설명하겠습니다. 이 예제는 `fs` 모듈로 폴더의 파일을 읽고, `archiver` 라이브러리로 ZIP 파일을 만들고, `axios` 라이브러리로 HTTP POST 요청을 보내는 흐름을 따릅니다.

### 1. **필요한 패키지 설치**
먼저, Node.js 프로젝트에서 필요한 패키지들을 설치해야 합니다:

```bash
npm init -y
npm install axios archiver fs-extra
```

- **`axios`**: HTTP 요청을 보내기 위한 라이브러리
- **`archiver`**: 파일들을 ZIP 형식으로 압축하는 라이브러리
- **`fs-extra`**: 파일 시스템 작업을 위한 확장된 `fs` 모듈

### 2. **폴더를 읽고 ZIP으로 압축한 후 POST로 전송**

다음 코드는 폴더를 읽고 압축한 후, 이를 POST로 전송하는 예시입니다.

```javascript
const fs = require('fs-extra');
const archiver = require('archiver');
const axios = require('axios');
const path = require('path');

// ZIP으로 묶을 폴더 경로와 결과 ZIP 파일 이름
const folderPath = './myFolder'; // 읽을 폴더 경로
const outputZip = './output.zip'; // 결과 ZIP 파일 경로

// 폴더를 ZIP으로 묶는 함수
async function zipFolder(folderPath, outputZip) {
  return new Promise((resolve, reject) => {
    // Output ZIP 파일 스트림 생성
    const output = fs.createWriteStream(outputZip);
    const archive = archiver('zip', { zlib: { level: 9 } }); // 압축 레벨 설정

    // ZIP 파일 스트림 에러 핸들링
    output.on('close', () => {
      console.log(`ZIP file created: ${outputZip} (${archive.pointer()} total bytes)`);
      resolve();
    });

    archive.on('error', (err) => reject(err));

    // 폴더 경로와 아카이브 연결
    archive.pipe(output);

    // 폴더 안의 모든 파일과 하위 폴더를 ZIP에 추가
    archive.directory(folderPath, false);

    // 압축 시작
    archive.finalize();
  });
}

// ZIP 파일을 POST로 전송하는 함수
async function sendZipFile(url, filePath) {
  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePath));

  try {
    const response = await axios.post(url, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });
    console.log('File uploaded successfully:', response.data);
  } catch (err) {
    console.error('File upload failed:', err);
  }
}

// 메인 함수: ZIP으로 묶고 서버에 POST 요청
async function main() {
  try {
    // 폴더를 ZIP으로 묶기
    await zipFolder(folderPath, outputZip);

    // POST로 ZIP 파일 전송
    const serverUrl = 'http://example.com/upload'; // 업로드할 서버 URL
    await sendZipFile(serverUrl, outputZip);
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
```

### 3. **코드 설명**

1. **폴더 압축 (`zipFolder` 함수)**:
   - `archiver` 라이브러리를 사용해 폴더를 ZIP 파일로 압축합니다.
   - `fs.createWriteStream`으로 ZIP 파일을 생성하고, 해당 파일로 데이터를 쓰기 위해 스트림을 연결합니다.
   - `archive.directory`를 사용해 폴더의 모든 파일을 ZIP 파일에 추가한 뒤, `archive.finalize()`로 압축을 완료합니다.

2. **POST 요청 (`sendZipFile` 함수)**:
   - `axios`와 `FormData`를 사용하여 ZIP 파일을 `multipart/form-data` 형식으로 서버에 전송합니다.
   - `fs.createReadStream(outputZip)`로 ZIP 파일을 읽어 `FormData`에 첨부합니다.

3. **메인 함수 (`main` 함수)**:
   - 폴더를 ZIP으로 묶고, 해당 ZIP 파일을 POST 요청으로 서버에 전송하는 과정을 진행합니다.

### 4. **실행**

위 코드를 실행하면, `myFolder`라는 폴더를 ZIP 파일로 묶은 후 `http://example.com/upload` 서버에 업로드합니다.

```bash
node index.js
```

### 5. **주의 사항**

- **서버 설정**: ZIP 파일을 업로드할 서버는 POST 요청을 처리할 수 있도록 설정되어 있어야 하며, 파일 업로드 엔드포인트를 만들어야 합니다.
- **Error Handling**: 실제 사용 시에는 에러 처리와 예외 상황을 좀 더 세밀하게 다룰 필요가 있습니다.

이 예제는 폴더 내의 파일들을 ZIP으로 압축한 후 서버에 HTTP POST로 전송하는 기본적인 방법을 보여줍니다.