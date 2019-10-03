module.exports = (req, res, next) => {
    return (req.isAuthenticated() && req.user.admin) ? next() : res.redirect('/error?msg=관리자만+접근이+가능합니다.&url=');
};