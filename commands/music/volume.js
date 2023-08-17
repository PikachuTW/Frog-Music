module.exports = {
    aliases: [],
    permLevel: 'DJ',
    run: async (client, message, args) => {
        client.distube.setVolume(message, Number(args[0]));
        message.reply(`聲音已經調整到 ${Number(args[0])}`);
    },
};
