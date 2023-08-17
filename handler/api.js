const db = require('./database.js');

module.exports = (router, client) => {
    const loginVerify = (req, res, next) => {
        const deleteCookies = () => {
            res.clearCookie('username');
            res.clearCookie('password');
            res.status(401).send({ success: false, error: '❌請登入' });
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

    const inChannel = (req, res, next) => {
        const { member } = res;
        const Channel = member.voice.channel;
        res.Channel = Channel;
        if (!Channel) {
            res.status(401).send({ success: false, error: '❌請加入語音頻道' });
        } else if (member.guild.members.me.voice.channel && member.guild.members.me.voice.channel.id !== Channel.id) {
            res.status(401).send({ success: false, error: '❌請加入我的語音頻道' });
        }
        next();
    };

    const isDj = (req, res, next) => {
        const { member } = res;
        if (!member.roles.cache.has('870741338960830544')) {
            const Channel = member.voice.channel;
            if (!Channel || Channel.members.filter((m) => m.id !== client.user.id).size !== 1) {
                res.status(401).send({ success: false, error: '❌你不是DJ' });
            }
        }
        next();
    };

    router.get('/play', loginVerify, inChannel, (req, res) => {
        const { text } = req.query;
        if (text) {
            client.distube.play(res.Channel, text, { member: res.member });
            res.send({ success: true });
        } else {
            res.status(400).send({ success: false, error: '❌未提供播放內容' });
        }
    });

    router.get('/playtop', loginVerify, inChannel, isDj, (req, res) => {
        const { text } = req.query;
        if (text) {
            client.distube.play(res.Channel, text, { member: res.member, position: 1 });
            res.send({ success: true });
        } else {
            res.status(400).send({ success: false, error: '❌未提供播放內容' });
        }
    });

    router.get('/pause', loginVerify, inChannel, isDj, (req, res) => {
        const queue = client.distube.getQueue(res.Channel);
        if (queue && queue.playing) {
            client.distube.pause(res.Channel);
        }
        res.send({ success: true });
    });

    router.get('/resume', loginVerify, inChannel, isDj, (req, res) => {
        const queue = client.distube.getQueue(res.Channel);
        if (queue && queue.paused) {
            client.distube.resume(res.Channel);
        }
        res.send({ success: true });
    });

    router.get('/search', loginVerify, inChannel, async (req, res) => {
        const { text } = req.query;
        if (text) {
            const results = await client.distube.search(text);
            res.send(results);
        } else {
            res.send({ success: false, error: '❌未提供搜尋內容' });
        }
    });

    router.get('/skip', loginVerify, inChannel, (req, res) => {
        if (!client.distube.getQueue(res.Channel) || client.distube.getQueue(res.Channel).songs.length <= 1) {
            res.send({ success: false, error: '❌沒有歌曲可以跳過' });
        }
        if (res.member.id in client.container.skips) {
            res.send({ success: false, error: '❌你早就投過了' });
        } else {
            client.container.skips.push(res.member.id);
        }
        if (client.container.skips.length >= Math.floor((res.Channel.members.size - 1) / 2)) {
            client.distube.skip(res.Channel);
        }
        res.send({ success: true, skip: true });
        // else {
        //     res.send({ skip: false, skips: client.container.skips.length, need: Math.floor((res.Channel.members.size - 1) / 2) });
        // }
    });

    router.get('/loginApi', (req, res) => {
        const { username, password } = req.query;
        if (username && password) {
            const cookieOptions = {
                maxAge: 365 * 24 * 60 * 60 * 1000,
            };
            const user = db.get(username);
            if (!user) {
                res.status(401).send({ error: '❌帳戶或密碼錯誤' });
            } else if (user.password !== password) {
                res.status(401).send({ error: '❌帳戶或密碼錯誤' });
            } else {
                res.cookie('username', username, cookieOptions);
                res.cookie('password', password, cookieOptions);
                res.send({ success: `${username} 登入成功` });
            }
        } else {
            res.status(401).send({ error: '❌未提供帳戶或密碼' });
        }
    });

    router.get('/inchannel', loginVerify, (req, res) => {
        const { member } = res;
        const Channel = member.voice.channel;
        if (!Channel) {
            res.send({ inchannel: false, message: '❌你尚未進入任何語音頻道！ 加入之後，你將自動跳轉到儀表板頁面' });
        } else if (member.guild.members.me.voice.channel && member.guild.members.me.voice.channel.id !== Channel.id) {
            res.send({ inchannel: false, message: '❌請加入機器人所在的頻道！ 加入之後，你將自動跳轉到儀表板頁面' });
        } else {
            res.send({ inchannel: true });
        }
    });
};
