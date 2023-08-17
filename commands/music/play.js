const { checkCC } = require('../../function');

module.exports = {
    aliases: ['p'],
    permLevel: 'User',
    run: async (client, message, args) => {
        const Channel = message.member.voice.channel;
        if (checkCC(message)) return;
        if (!args[0]) return message.reply('請提供有效檔案!');
        if (message.member.roles.cache.has('969970648547991552')) return message.reply('你不能點歌! :joy:');
        const name = args.join(' ');
        let url;
        try {
            url = new URL(name);
            if (url && url.searchParams.has('list')) {
                url.searchParams.delete('list');
            }
        } catch { }
        await client.distube.play(Channel, name, {
            message,
            textChannel: message.channel,
            member: message.member,
        });
    },
};
