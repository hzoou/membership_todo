<h1 align="center">Welcome to membership-todo 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/hzoou/membership-todo#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/hzoou/membership-todo/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
</p>

### 2019 boostcamp mission 3
#### directory structure
  ```
  web
  ├── 📂 bin
  |   └── 📄 www
  ├── 📂 database
  |   └── 📂 sql
  |       └── 📄 init-db.sql
  |   └── 📄 config.js
  |   └── 📄 connection.js
  ├── 📂 middlewares
  |   └── 📄 auth.js
  |   └── 📄 passport.js
  |   └── 📄 session.js
  ├── 📂 models
  |   └── 📄 board.js
  |   └── 📄 query.js
  |   └── 📄 sqlExecutor.js
  |   └── 📄 user.js
  ├── 📂 public
  |   └── 📂 images
  |   └── 📂 javascripts
  |       └── 📂 components
  |           └── 📄 Log.js
  |           └── 📄 Modal.js
  |           └── 📄 Permission.js
  |       └── 📄 admin.js
  |       └── 📄 board.js
  |       └── 📄 mypage.js
  |       └── 📄 signup.js
  |       └── 📄 utils.js
  |   └── 📂 stylesheets
  |       └── 📄 admin.css
  |       └── 📄 board.css
  |       └── 📄 index.css
  |       └── 📄 log.css
  |       └── 📄 modal.css
  |       └── 📄 mypgae.css
  |       └── 📄 sign.css
  ├── 📂 routes
  |   └── 📂 api
  |       └── 📄 admin.js
  |       └── 📄 board.js
  |       └── 📄 mypgae.js
  |       └── 📄 signin.js
  |       └── 📄 signup.js
  |   └── 📄 api.js
  |   └── 📄 index.js
  ├── 📂 views
  |   └── 📂 layout
  |       └── 📄 header.ejs
  |       └── 📄 sign-form.ejs
  |   └── 📂 link
  |       └── 📄 head.ejs
  |   └── 📄 admin.ejs
  |   └── 📄 board.ejs
  |   └── 📄 board.ejs
  |   └── 📄 error.ejs
  |   └── 📄 index.ejs
  |   └── 📄 mypage.ejs
  |   └── 📄 signin.ejs
  |   └── 📄 signup.ejs
  └── 📄 app.js
  ```

#### Database Modeling
![image](https://i.imgur.com/Q4lroSz.png)

#### .env에서 사용하는 환경변수
> DB_HOST=127.0.0.1
> DB_USER=remote
> DB_PASSWORD=boostcamp2019
> DB_NAME=todo

#### API
- user API
  - [board](https://github.com/hzoou/membership-todo/wiki/%EC%9D%BC%EB%B0%98-%EC%82%AC%EC%9A%A9%EC%9E%90-API-:-BOARD)
  - [error](https://github.com/hzoou/membership-todo/wiki/일반-사용자-API-:-ERROR)
  - [signin](https://github.com/hzoou/membership-todo/wiki/일반-사용자-API-:-SIGN-IN)
  - [signout](https://github.com/hzoou/membership-todo/wiki/일반-사용자-API-:-SIGN-OUT)
  - [signup](https://github.com/hzoou/membership-todo/wiki/일반-사용자-API-:-SIGN-UP)
- admin API
  - [admin](https://github.com/hzoou/membership-todo/wiki/%EA%B4%80%EB%A6%AC%EC%9E%90-API-:-ADMIN)
  
#### Preview
> 메인 페이지 - 로그인 한 경우
>
![](https://i.imgur.com/YzePbdL.jpg)
> 메인 페이지 - 로그인 안 한 경우
>
![](https://i.imgur.com/ySVD0Av.jpg)
> 로그인 페이지
>
![](https://i.imgur.com/dRfEgIS.png)
> 회원가입 페이지
>
![](https://i.imgur.com/kzVKh3E.png)
> 관리자 페이지
>
![](https://i.imgur.com/CdqOa54.png)
> 보드 페이지 (읽기/편집 권한 있는 경우)
>
![](https://i.imgur.com/1FQVL6O.png)
> 보드 페이지 (읽기 권한 있는 경우)
>
![](https://i.imgur.com/vTNzUGe.png)
> 보드 페이지 (권한이 없는 경우)
>
![](https://i.imgur.com/GGszrxL.png)
> 마이 페이지 (내 보드에 권한 추가)
>
![](https://i.imgur.com/SC4VwMA.png)
> 마이 페이지 (내가 권한이 있는 보드 목록)
>
![](https://i.imgur.com/xRkMiZl.png)

### 🏠 [Homepage](http://210.89.190.77:3000)

## Install

```sh
npm install
```

## DB Setting

```shell script
mysql> source 경로/web/database/sql/init-db.sql
```

## Start

```sh
npm start
```

## Version
```shell script
npm 6.9.0
node 10.16.3
mysql 8.0.17
```

## Author

👤 **hzoou (Woo hyeju)**

* Github: [@hzoou](https://github.com/hzoou)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/hzoou/membership-todo/issues).

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_