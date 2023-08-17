const { checkCC } = require('../../function');

module.exports = {
    aliases: ['vs', 's', 'voteskip'],
    permLevel: 'User',
    run: async (client, message) => {
        const Channel = message.member.voice.channel;
        if (checkCC(message)) return;
        if (!client.distube.getQueue(message) || client.distube.getQueue(message).songs.length <= 1) {
            return message.reply('已經沒有下一首歌曲!');
        }
        if (client.container.skips.indexOf(message.member.id) === -1) {
            client.container.skips.push(message.member.id);
        }
        if (client.container.skips.length >= Math.floor((Channel.members.size - 1) / 2)) {
            client.distube.skip(message);
        } else {
            return message.reply(`現在有 \`${client.container.skips.length}\` 人投票，必須要 \`${Math.floor((Channel.members.size - 1) / 2)}\` 票`);
        }
    },
};
