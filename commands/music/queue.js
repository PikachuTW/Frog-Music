const { EmbedBuilder } = require('discord.js');
const { es } = require('../../config.js');

module.exports = {
    aliases: ['q'],
    permLevel: 'User',
    run: async (client, message) => {
        const queue = client.distube.getQueue(message);
        if (!queue || queue.length === 0) {
            message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(es.wrong)
                        .setTitle('❌ 現在沒有任何歌曲'),
                ],
            });
        } else {
            message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`播放清單 ( ${queue.songs.length}首 ) ( ${queue.formattedCurrentTime} / ${queue.songs[0].formattedDuration} ) (共 ${queue.formattedDuration} )`)
                        .setColor(es.color)
                        .setFooter({ text: es.text, iconURL: es.icon })
                        .setDescription(`${queue.songs.map((song, id) => `\`${id || 'now'}\` [${song.name}](${song.url}) | ${song.formattedDuration} ${song.user.tag}`).slice(0, 10).join('\n')}`),
                ],
            });
        }
    },
};
