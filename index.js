const { readdirSync } = require('fs');
const Discord = require('discord.js');
const dotenv = require('dotenv');
const { DisTube } = require('distube');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const express = require('express');
const disTubeHandler = require('./handler/disTube.js');
const { permLevels } = require('./config.js');

dotenv.config();

const app = express();
app.use(require('cookie-parser')());
app.use(require('cors')());
// app.use(require('compression')());
// eslint-disable-next-line import/order
const server = require('http').createServer(app);
// eslint-disable-next-line import/order
const io = require('socket.io')(server);

app.set('view engine', 'html');
app.use('/dist', express.static('dist'));

const levelCache = {};
for (let i = 0; i < permLevels.length; i++) {
    const thisLevel = permLevels[i];
    levelCache[thisLevel.name] = thisLevel.level;
}

const client = new Discord.Client({ intents: 3276799, partials: ['CHANNEL', 'USER', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'GUILD_SCHEDULED_EVENT'] });

client.io = io;

client.distube = new DisTube(client, {
    plugins: [new YtDlpPlugin({ update: false })],
    searchSongs: 10,
    youtubeCookie: process.env.youtubeCookie,
    ytdlOptions: {
        highWaterMark: 1024 * 1024 * 64,
        quality: 'highestaudio',
        format: 'audioonly',
        liveBuffer: 60000,
        dlChunkSize: 1024 * 1024 * 4,
    },
    emptyCooldown: 30,
    nsfw: true,
});
client.container = {
    commands: new Discord.Collection(),
    aliases: new Discord.Collection(),
    cooldown: new Discord.Collection(),
    skips: [],
    levelCache,
};

const folders = readdirSync('./commands/').filter((file) => !file.endsWith('.js'));
folders.forEach((folder) => {
    const cmds = readdirSync(`./commands/${folder}/`).filter((file) => file.endsWith('.js'));
    cmds.forEach((file) => {
        try {
            const code = require(`./commands/${folder}/${file}`);
            const cmdName = file.split('.')[0];
            code.name = cmdName;
            client.container.commands.set(cmdName, code);
            code.aliases.forEach((alias) => {
                client.container.aliases.set(alias, cmdName);
            });
            console.log(`CMD ${cmdName} 已被載入 ✅`);
        } catch (error) {
            console.log(`${error}`);
        }
    });
});

const eventFiles = readdirSync('./events/').filter((file) => file.endsWith('.js'));
eventFiles.forEach((file) => {
    try {
        const eventName = file.split('.')[0];
        console.log(`EVENT ${eventName} 已被載入 ✅`);
        const event = require(`./events/${file}`);
        client.on(eventName, event.bind(null, client));
    } catch (error) {
        console.log(`${error}`);
    }
});

client.login(process.env.DISCORD_TOKEN);

disTubeHandler(client);

setInterval(() => {
    if (Number.isNaN(client.ws.ping)) {
        process.exit(0);
    }
}, 60000);

require('./handler/render.js')(app, client);

const router = express.Router();

app.use('/api', router);

require('./handler/api.js')(router, client);

client.io.on('connection', () => {});
client.io.of('/i').on('connection', () => {});

server.listen(3000, () => {
    console.log('http://192.168.3.61:3000/');
});
