const path = require('path');
const db = require('./database.js');

module.exports = (router, client) => {
    const loginVerify = (req, res, next) => {
        const deleteCookies = () => {
            res.clearCookie('username');
            res.clearCookie('password');
            res.redirect('/login');
        };
        const { username, password } = req.cookies;
        if (!username || !password) {
            return deleteCookies();
        }
        const user = db.get(username);
        if (!user || user.password !== password) {
            return deleteCookies();
        }
        const guild = client.guilds.cache.get('828450904990154802');
        const member = guild.members.cache.get(user.id);
        if (!member) {
            return deleteCookies();
        }
        res.member = member;
        next();
    };

    router.get('/', (req, res) => {
        res.redirect('/dashboard');
    });

    router.get('/notjoin', loginVerify, (req, res) => {
        res.sendFile(path.join(__dirname, '../src/notjoin.html'));
    });

    router.get('/login', (req, res) => {
        res.sendFile(path.join(__dirname, '../src/login.html'));
    });

    router.get('/dashboard', loginVerify, (req, res) => {
        res.sendFile(path.join(__dirname, '../src/dashboard.html'));
    });
};
