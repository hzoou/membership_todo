module.exports = (req, res, next) => {
    return (req.isAuthenticated()) ? next() : res.redirect('/error?msg=해당+기능은+로그인+후+이용이+가능합니다.&url=signin');
};