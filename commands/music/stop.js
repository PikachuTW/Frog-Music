const { checkCC } = require('../../function');

module.exports = {
    aliases: [],
    permLevel: 'DJ',
    run: async (client, message) => {
        if (checkCC(message)) return;
        client.distube.stop(message);
        message.reply('已經停止!');
    },
};
