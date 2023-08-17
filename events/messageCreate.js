const { permlevel } = require('../function.js');
const { prefix, permLevels } = require('../config.js');

module.exports = async (client, message) => {
    if (message.guildId !== '828450904990154802') return;
    const { container } = client;
    if (!message.author.bot && message.content.toLowerCase().startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        const permlevelGet = permlevel(message.member);
        const cmd = container.commands.get(command) || container.commands.get(container.aliases.get(command));
        if (cmd) {
            if (permlevelGet < container.levelCache[cmd.permLevel]) {
                message.reply(`你沒有權限使用!\n你的權限等級為 ${permlevelGet} (${permLevels.find((l) => l.level === permlevelGet).name})\n你需要權限等級 ${container.levelCache[cmd.permLevel]} (${cmd.permLevel})`);
            } else {
                try {
                    const stamp = client.container.cooldown.get(message.author.id) || 0;
                    const now = Date.now();
                    if (now - stamp < 2000) {
                        try {
                            message.reply(`指令還在冷卻中! (${((2000 - (now - stamp)) / 1000).toPrecision(2)}秒)`);
                        } catch { }
                    } else {
                        await cmd.run(client, message, args);
                        client.container.cooldown.set(message.author.id, now);
                        console.log(`CMD ${permLevels.find((l) => l.level === permlevelGet).name} ${message.author.tag} 執行了 ${cmd.name}`);
                    }
                } catch (e) {
                    message.channel.send({ content: `出現了些錯誤\n\`\`\`${e.message}\`\`\``.slice(0, 2000) }).catch();
                }
            }
        }
    }
    if (message.author.bot) return;
    if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
        try {
            message.reply(`嗨! 機器人的前綴是 \`${prefix}\``);
        } catch { }
    }
};
