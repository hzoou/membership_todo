const USER = require('../models/user');
const passport = require('passport');
const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    const user = await USER.findUser(id);
    done(null, user);
});

passport.use(new LocalStrategy({ usernameField: 'id', passwordField: 'pw'},
    async function(id, pw, done) {
        const user = await USER.findUser(id);
        if (!user) return done(null, false, { message: '아이디가 존재하지 않습니다.' });
        pw = crypto.createHash('sha512').update(pw).digest('base64');
        if (!USER.isCorrectPw(pw)) return done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        return done(null, user);
    }
));

module.exports = passport;