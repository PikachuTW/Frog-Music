module.exports = {
    aliases: [],
    permLevel: 'User',
    run: async (client, message) => {
        message.reply(`機器人延遲: \`${Date.now() - message.createdTimestamp}\` ms\nApi延遲: \`${client.ws.ping}\` ms`);
    },
};
