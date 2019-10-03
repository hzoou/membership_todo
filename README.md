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
  |       └── 📄 init.sql
  |   └── 📄 config.js
  |   └── 📄 connection.js
  ├── 📂 middlewares
  |   └── 📄 isAdmin.js
  |   └── 📄 isLoggedIn.js
  |   └── 📄 passport.js
  |   └── 📄 session.js
  ├── 📂 models
  |   └── 📄 board.js
  |   └── 📄 user.js
  ├── 📂 public
  |   └── 📂 images
  |   └── 📂 javascripts
  |       └── 📄 admin.js
  |       └── 📄 utils.js
  |   └── 📂 stylesheets
  |       └── 📄 admin.css
  |       └── 📄 index.css
  |       └── 📄 signin.css
  ├── 📂 routes
  |   └── 📄 admin.js
  |   └── 📄 board.js
  |   └── 📄 index.js
  |   └── 📄 signin.js
  |   └── 📄 signup.js
  ├── 📂 schema
  |   └── 📄 query.js
  ├── 📂 views
  |   └── 📄 admin.ejs
  |   └── 📄 error.ejs
  |   └── 📄 index.ejs
  |   └── 📄 signin.ejs
  |   └── 📄 signup.ejs
  └── 📄 app.js
  ```

#### Database Modeling
![image](https://i.imgur.com/Q4lroSz.png)

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

### 🏠 [Homepage](https://github.com/hzoou/membership-todo#readme)

## Install

```sh
npm install
```

## Start

```sh
npm start
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