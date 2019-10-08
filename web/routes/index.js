const express = require('express');
const router = express.Router();
const { isLoggedIn, isAdmin } = require('../middlewares/auth');

router.get('/', (req, res) => {
  res.render('index', { title: 'to do', id: (req.user) ? req.user.id : '', admin: (req.user && req.user.admin) ? true : false });
});

router.get('/mypage', isLoggedIn, (req, res) => {
  res.render('mypage', { title: 'my page', id: (req.user) ? req.user.id : '', admin: (req.user && req.user.admin) ? true : false });
});

router.get('/board', isLoggedIn, (req, res) => {
  res.render('board', { title: 'board', id: (req.user) ? req.user.id : '', admin: (req.user && req.user.admin) ? true : false });
});

router.get('/board/:id', (req, res) => {
  res.render('board', { title: 'board', id: (req.user) ? req.user.id : '', boardId: req.params.id, admin: (req.user && req.user.admin) ? true : false });
});

router.get('/signin', (req, res) => {
  res.render('signin', { title: 'sign in' });
});

router.get('/signup', (req, res) => {
  res.render('signup', { title: 'sign up' });
});

router.get('/admin', isAdmin, function(req, res) {
  res.render('admin', { title: 'admin', id: req.user.id });
});

module.exports = router;
