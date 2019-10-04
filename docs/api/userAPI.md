## 일반 사용자 API 설계

### board

#### - URI

| Method | URI             | feat            |
| ------ | :-------------- | --------------- |
| GET    | /board          |                 |
| GET    | /board/:user_id | 보드 가져오기   |
| POST   | /board/item     | 아이템 추가하기 |
| DELETE | /board/item     | 아이템 삭제하기 |
| PUT    | /board/item     | 아이템 수정하기 |



#### - 보드 가져오기

##### 시나리오

1. 로그인 했는지 확인
   - 로그인 하지 않은 유저는 `메인 페이지` 로 redirection
2. 권한이 있는지 확인
   - 해당 보드에 읽기 권한이 없는 유저는 `/board/:본인_id` 로 redirection

##### URI

```
GET /board/:user_id
```

##### Request

```
{}
```

##### Response

```
{
    "status": "SUCCESS",
    "board_idx":
    "data": [
        {
            "LIST_idx": 
            "ITEM_idx": 
            "LIST_title": 
            "ITEM_title": 
        }
    ]
}
```

```
{
    "status": "FAIL",
    "message": "해당 id는 존재하는 board가 없습니다."
}
```



#### - 아이템 추가하기

##### 시나리오

1. 권한이 있는지 확인
   - 해당 보드에 편집 권한이 없는 유저는 추가 버튼 `display: none`
2. 200 response 후 LOG 테이블에 행동 추가 -> req.user 통해 user_idx 확인
3. 올바르지 않은 추가인 경우 예외 처리

##### URI

```
POST /board/item
```

##### Request

```
{
    "list_idx":
    "data": [
        {
            "title": 
        }
    ]
}
```

##### Response

```
{
    "status": "SUCCESS",
    "message": "해당 item을 추가했습니다."
}
```

```
{
    "status": "FAIL",
    "message": "해당 item을 추가하는데 실패했습니다."
}
```



#### - 아이템 삭제하기

##### 시나리오

1. 권한이 있는지 확인
   - 해당 보드에 편집 권한이 없는 유저는 전체 아이템에 삭제 버튼 `display: none`
2. 200 response 후 LOG 테이블에 행동 추가 -> req.user 통해 user_idx 확인
3. 올바르지 않은 삭제인 경우 예외 처리

##### URI

```
DELETE /board/item
```

##### Request

```
{
    "item_idx":
}
```

##### Response

```
{
    "status": "SUCCESS",
    "message": "해당 item을 삭제했습니다."
}
```

```
{
    "status": "FAIL",
    "message": "해당 item을 삭제하는데 실패했습니다."
}
```



#### - 아이템 수정하기

##### 시나리오

1. 권한이 있는지 확인
   - 해당 보드에 편집 권한이 없는 유저는 전체 아이템에 수정 버튼 `display: none`
2. 200 response 후 LOG 테이블에 행동 추가 -> req.user 통해 user_idx 확인
3. 올바르지 않은 수정인 경우 예외 처리

##### URI

```
PUT /board/item
```

##### Request

```
{
    "item_idx":
    "data": [
        {
            "title": 
            "content": 
        }
    ]
}
```

##### Response

```

{
    "status": "SUCCESS",
    "message": "해당 item을 삭제했습니다."
}
```

```

{
    "status": "FAIL",
    "message": "해당 item을 삭제하는데 실패했습니다."
}
```

------

### signin

#### - URI

| Method | URI     | feat                   |
| ------ | :------ | ---------------------- |
| GET    | /signin | 로그인 페이지 보여주기 |
| POST   | /signin | 로그인                 |



#### - 로그인

##### 시나리오

1. 프론트에서 입력값 확인
   - 입력하지 않은 항목이 있는 경우 `return alert()`
   - 모든 항목을 입력한 경우 `POST /login` 으로 id와 pw값 req.body에 담아서 전송
2. 백엔드에서 입력값 확인
   - passport 사용
   - 아이디 또는 비밀번호가 일치하지 않는 경우 `/error` 로 redirect
   - 로그인에 성공한 경우 `/board` 로 redirect

##### URI

```
POST /signin
```

##### Request

```
{
    "id": 
    "pw": 
}
```

##### Response

```
{}
```

------

### signup

#### - URI

| Method | URI         | feat                     |
| ------ | :---------- | ------------------------ |
| GET    | /signup     | 회원가입 페이지 보여주기 |
| GET    | /signup/:id | 아이디 중복 검사         |
| POST   | /signup     | 회원가입                 |



#### - 아이디 중복검사

##### URI

```
GET /signup/:id
```

##### Request

```
{}
```

##### Response

```
{
    "status": "SUCCESS",
    "message": "사용 가능한 아이디입니다."
}
```

```
{
    "status": "FAIL",
    "message": "이미 존재하는 아이디입니다."
}
```



#### - 회원가입

##### 시나리오

1. 회원가입 완료
   1. 유저 테이블에 가입한 회원 추가
   2. 보드 테이블에 가입한 회원의 정보로 보드 추가
   3. 리스트 테이블에 생성된 보드의 정보로 초기 리스트 (To Do, In Progress, Done) 추가
   4. 모든 작업 후에 `/signin` 으로 redirect 후 passport 등록

##### URI

```
POST /signin
```

##### Request

```
{
    "id": 
    "pw": 
}
```

##### Response

```
{
}
```

------

### signout

#### - URI

| Method | URI      | feat     |
| ------ | :------- | -------- |
| GET    | /signout | 로그아웃 |



#### - 로그아웃

##### 시나리오

1. req.user 저장된 user 삭제 => `req.logout()`
2. `/` 로 redirect

##### URI

```
GET /signout
```

##### Request

```
{}
```

##### Response

```
{}
```

------

### error

#### - URI

| Method | URI    | feat        |
| ------ | :----- | ----------- |
| GET    | /error | 에러 페이지 |



#### - 에러 페이지

##### 시나리오

1. req.qurey의 msg 값을 `alert(msg)`
2.  `/req.query.url` 로 redirect

##### URI

```
GET /error
```

##### Request

```
{}
```

##### Response

```
{}
```