# 익명 게시판 서버

> 원티드 Node.js 엔지니어 과제 - 댓글 기능이 있는 익명 게시판 및 키워드 알림 기능 구현

## 📝 프로젝트 개요

댓글 기능과 키워드 알림 기능을 포함한 익명 게시판 서버입니다. 로그인 없이 사용할 수 있으며, 게시글과 댓글 작성, 키워드 기반 알림 기능을 제공합니다.

## 🛠 기술 스택

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: MySQL
- **ORM**: Sequelize

## 🗂 데이터베이스 스키마

### 스키마 파일 위치

[db/scripts/1_schema.sql](https://github.com/2nnovate/board-server/blob/master/db/scripts/1_schema.sql)

### 테이블 구조

- **posts**: 게시글 정보
  - id, title, content, author, password, created_at, updated_at, deleted_at

- **comments**: 댓글 정보 (대댓글 지원)
  - id, post_id, parent_id, content, author, created_at, deleted_at

- **keyword_notifications**: 키워드 알림 설정
  - id, author, keyword, created_at

- **notification_logs**: 알림 발송 로그
  - id, target_author, keyword, trigger_type, trigger_id, created_at

## 🚀 설치 및 실행

### 사전 요구사항

- Node.js (v20.11.0 이상)
- Docker
- Docker Compose

### 1. 저장소 클론

```bash
git clone https://github.com/2nnovate/board-server.git
cd board-server
```

### 2. 의존성 설치 - optional

```bash
npm i
```
단위 테스트 실행을 위해 필요합니다.

### 3. 환경 설정

환경 변수는 `docker-compose.yml` 파일에 미리 구성되어 있어 별도 설정이 불필요합니다.

### 4. Docker 컨테이너 실행

모든 서비스(애플리케이션, MySQL)가 Docker Compose로 구성되어 있습니다:

```bash
# 컨테이너 실행 (데이터베이스 스키마 자동 생성)
npm run up:containers
```

데이터베이스 스키마는 `db/scripts/1_schema.sql` 파일을 통해 자동으로 초기화됩니다.

서버는 `http://localhost:3000`에서 실행됩니다.

## 🔍 주요 기능

### 게시글 기능
- ✅ 게시글 CRUD (생성, 조회, 수정, 삭제)
- ✅ 제목과 작성자로 검색 가능
- ✅ 비밀번호 기반 수정/삭제 권한 관리
- ✅ 페이징 처리

### 댓글 기능
- ✅ 댓글 작성 및 조회
- ✅ 대댓글 지원 (계층형 구조)
- ✅ 페이징 처리

### 키워드 알림 기능
- ✅ 게시글 생성 및 수정 / 댓글 등록 시 키워드 매칭 알림
  - 트라이 자료구조를 사용하여 효율적인 키워드 매칭
- ✅ 알림 발송 로그 기록

## 📋 API 명세

### 게시글 API

| Method | Endpoint | Description | Request |
|--------|----------|-------------|---------|
| GET | `/post/list` | 게시글 목록 조회 (페이징, 검색) | **Query Parameters:**<br>- `current`: 현재 페이지 (기본값: 1)<br>- `pageSize`: 페이지당 항목 수 (기본값: 20)<br>- `searchKey`: 검색 필드 (`title` 또는 `author`)<br>- `searchValue`: 검색어 |
| GET | `/post/:id` | 특정 게시글 조회 | **URL Parameters:**<br>- `id`: 게시글 ID |
| POST | `/post` | 게시글 작성 | **Request Body (JSON):**<br>- `title`: 게시글 제목 (필수)<br>- `content`: 게시글 내용 (필수)<br>- `author`: 게시글 작성자 (필수)<br>- `password`: 게시글 비밀번호 (필수) |
| PUT | `/post/:id` | 게시글 수정 | **URL Parameters:**<br>- `id`: 게시글 ID<br><br>**Request Body (JSON):**<br>- `title`: 게시글 제목 (필수)<br>- `content`: 게시글 내용 (필수)<br>- `password`: 게시글 비밀번호 (필수) |
| DELETE | `/post/:id` | 게시글 삭제 | **URL Parameters:**<br>- `id`: 게시글 ID<br><br>**Request Body (JSON):**<br>- `password`: 게시글 비밀번호 (필수) |

### 댓글 API

| Method | Endpoint | Description | Request |
|--------|----------|-------------|---------|
| GET | `/comment/list` | 댓글 목록 조회 (페이징) | **Query Parameters:**<br>- `current`: 현재 페이지 (기본값: 1)<br>- `pageSize`: 페이지당 항목 수 (기본값: 20) |
| POST | `/comment` | 댓글 작성 | **Request Body (JSON):**<br>- `postId`: 게시글 ID (필수)<br>- `parentId`: 부모 댓글 ID (선택, 대댓글인 경우)<br>- `content`: 댓글 내용 (필수)<br>- `author`: 댓글 작성자 (필수) |

## 📊 API 사용 예시

### 게시글 작성

```bash
curl -X POST http://localhost:3000/post \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Hello",
    "content": "Node.js 개발자입니다.",
    "author": "박인호",
    "password": "1234"
  }'
```

### 댓글 작성

```bash
curl -X POST http://localhost:3000/comment \
  -H "Content-Type: application/json" \
  -d '{
    "postId": 1,
    "content": "반가워요, 원티드랩에 오신 걸 환영합니다!",
    "author": "홍길동"
  }'
```

### 게시글 목록 조회 (페이징 및 검색)

```bash
curl "http://localhost:3000/post/list?current=1&pageSize=10&searchKey=title&searchValue=Hello"
```

## 🧪 테스트

```bash
# 단위 테스트
npm run test
```

단위 테스트 실행을 위해서는 [의존성 설치](#2-의존성-설치--optional)가 필요합니다.

## 🔧 주요 실행 스크립트 (도커 컨테이너 관련)

```bash
# 컨테이너 시작
npm run up:containers

# 컨테이너 중지
npm run down:containers

# 볼륨 및 데이터 완전 삭제 (데이터베이스 초기화)
npm run reset:volumes

# 이미지 삭제
npm run reset:images
```

## 📁 프로젝트 구조

```
db/
├── scripts/
│   ├── 1_schema.sql                      # 데이터베이스 스키마
│   └── 2_data.sql                        # 초기 데이터
src/
├── app.module.ts                         # 메인 애플리케이션 모듈
├── posts/                                # 게시글 모듈
│   ├── entities/
│   ├── dtos/
│   ├── gaurds/
│   ├── posts.controller.ts
│   ├── posts.service.ts
│   └── posts.module.ts
├── comments/                             # 댓글 모듈
│   ├── entities/
│   ├── dtos/
│   ├── gaurds/
│   ├── comments.controller.ts
│   ├── comments.service.ts
│   └── comments.module.ts
├── notifications/                        # 알림 모듈
│   ├── entities/
│   ├── domain/            
│   │   └── keyword-subscription.trie.ts  # 키워드 검색 트라이
│   ├── dtos/
│   ├── notifications.controller.ts
│   └── notifications.service.ts
└── database/                             # ORM 설정
docker-compose.yml                        # Docker Compose 설정 파일
```

## 🔧 기타

### 데이터베이스 접근

컨테이너 실행 중에는 MySQL에 직접 접근할 수 있습니다:

```bash
# 컨테이너 내 MySQL 접속
docker-compose exec db mysql -u root -p anonymous_board
```

(비밀번호는 root로 설정되어 있으며, `docker-compose.yml` 파일에서 확인 가능)

## 👨‍💻 개발자

**박인호** - [2nnovate0810@gmail.com](mailto:2nnovate0810@gmail.com)