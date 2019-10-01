## 일반 사용자 API 설계

### board

#### - URI

| Method | URI             | feat         |
| ------ | --------------- | -------------|
| GET    | /board          |              |
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
200 : Ok
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
400 : Bad Request
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
            "content": 
        }
    ]
}
```

##### Response

```
200 : Ok
{
    "status": "SUCCESS",
    "message": "해당 item을 추가했습니다."
}
```

```
400 : Bad Request
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
200 : Ok
{
    "status": "SUCCESS",
    "message": "해당 item을 삭제했습니다."
}
```

```
400 : Bad Request
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
200 : Ok
{
    "status": "SUCCESS",
    "message": "해당 item을 삭제했습니다."
}
```

```
400 : Bad Request
{
    "status": "FAIL",
    "message": "해당 item을 삭제하는데 실패했습니다."
}
```



