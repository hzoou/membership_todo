const session = require('express-session');
const FileStore = require('session-file-store')(session);

module.exports = session({
    secret: 'secret-code',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
});