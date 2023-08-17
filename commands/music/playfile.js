const { checkCC } = require('../../function');

module.exports = {
    aliases: ['pf'],
    permLevel: 'User',
    run: async (client, message) => {
        const Channel = message.member.voice.channel;
        if (checkCC(message)) return;
        if (message.member.roles.cache.has('969970648547991552')) return message.reply('你不能點歌! :joy:');
        const file = message.attachments.first();
        if (!file) return message.reply('請提供有效連結!');
        const link = file.url;
        await client.distube.play(Channel, link, {
            message,
            textChannel: message.channel,
            member: message.member,
        });
    },
};
