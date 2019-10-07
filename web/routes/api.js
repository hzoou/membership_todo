const express = require('express');
const router = express.Router();
const boardRouter = require('./api/board');
const adminRouter = require('./api/admin');
const signinRouter = require('./api/signin');
const signupRouter = require('./api/signup');
const mypageRouter = require('./api/mypage');

router.use('/board', boardRouter);
router.use('/admin', adminRouter);
router.use('/signin', signinRouter);
router.use('/signup', signupRouter);
router.use('/mypage', mypageRouter);

module.exports = router;
