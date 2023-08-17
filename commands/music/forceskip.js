const { checkCC } = require('../../function');

module.exports = {
    aliases: [],
    permLevel: 'DJ',
    run: async (client, message) => {
        if (checkCC(message)) return;
        if (!client.distube.getQueue(message) || client.distube.getQueue(message).songs.length <= 1) {
            return message.reply('已經沒有下一首歌曲!');
        }
        client.distube.skip(message);
    },
};
