const Discord = require('discord.js');
const os = require('os');
const cpuStat = require('cpu-stat');
const moment = require('moment');
require('moment-duration-format');

const { ess } = require('../../config.js');

module.exports = {
    aliases: [],
    permLevel: 'User',
    run: (client, message) => {
        const es = ess[client.botName];
        const duration = moment.duration(client.uptime).format(' D [天], H [小時], m [分], s [秒]');
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle('__**詳細資訊:**__')
                    .setColor(es.color)
                    .addFields([
                        { name: '⏳ 記憶體使用量', value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``, inline: true },
                        { name: '⌚️ 上線時間', value: `\`${duration}\``, inline: true },
                        { name: '👾 Discord.js', value: `\`v${Discord.version}\``, inline: true },
                        { name: '🤖 Node', value: `\`${process.version}\``, inline: true },
                        { name: 'API 延遲', value: `\`${client.ws.ping}ms\``, inline: true },
                        { name: '🤖 CPU 型號', value: `\`${os.cpus().map((i) => `${i.model}`)[0]}\``, inline: true },
                        { name: '🤖 CPU 時脈', value: `\`${cpuStat.avgClockMHz()}MHz\``, inline: true },
                        { name: '🤖 Arch', value: `\`${os.arch()}\``, inline: true },
                        { name: '💻 系統平台', value: `\`\`${os.platform()}\`\``, inline: true },
                    ])
                    .setFooter({ text: es.text, iconURL: es.icon }),
            ],
        });
    },
};
