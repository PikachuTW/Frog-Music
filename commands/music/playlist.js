const { checkCC } = require('../../function');

module.exports = {
    aliases: ['pl'],
    permLevel: 'DJ',
    run: async (client, message, args) => {
        const Channel = message.member.voice.channel;
        if (checkCC(message)) return;
        if (!args[0]) return message.reply('請提供有效歌曲名稱!');
        if (message.member.roles.cache.has('969970648547991552')) return message.reply('你不能點歌! :joy:');
        const name = args.join(' ');
        try {
            await client.distube.play(Channel, name, {
                message,
                textChannel: message.channel,
                member: message.member,
            });
        } catch (err) {
            console.log(err);
        }
    },
};
