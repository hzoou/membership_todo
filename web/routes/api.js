const express = require('express');
const router = express.Router();
const boardRouter = require('./api/board');
const adminRouter = require('./api/admin');
const signinRouter = require('./api/signin');
const signupRouter = require('./api/signup');

router.use('/board', boardRouter);
router.use('/admin', adminRouter);
router.use('/signin', signinRouter);
router.use('/signup', signupRouter);

module.exports = router;
