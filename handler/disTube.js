const { EmbedBuilder } = require('discord.js');
const { millify } = require('millify');
const { es, annChannel } = require('../config.js');

module.exports = (client) => {
    const Channel = () => client.channels.cache.get(annChannel);
    try {
        client.distube
            .on('playSong', (queue, song) => {
                // eslint-disable-next-line no-param-reassign
                client.container.skips = [];
                Channel().send({
                    embeds: [
                        new EmbedBuilder()
                            .setThumbnail(song.thumbnail)
                            .addFields([
                                { name: '請求者', value: `${song.user}`, inline: true },
                                { name: '時長', value: `\`${song.formattedDuration}\``, inline: true },
                                { name: '觀看次數', value: `\`${millify(song.views)}\``, inline: true },
                                { name: '按讚數', value: `\`${song.likes}\``, inline: true },
                            ])
                            .setAuthor({ name: `${song.name}`, url: song.url })
                            .setColor(es.color)
                            .setFooter({ text: es.text, iconURL: es.icon }),
                    ],
                });
                client.io.emit('play', {
                    name: song.name,
                    url: song.url,
                    thumbnail: song.thumbnail,
                    user: song.user,
                    duration: song.formattedDuration,
                    views: millify(song.views),
                    likes: song.likes,
                });
            })
            .on('addSong', (queue, song) => {
                Channel().send(`${song.user} 已經新增 \`${song.name}\` - \`${song.formattedDuration}\``);
                client.io.emit('addSong', {
                    name: song.name,
                    url: song.url,
                    thumbnail: song.thumbnail,
                    user: song.user,
                    duration: song.formattedDuration,
                    views: millify(song.views),
                    likes: song.likes,
                });
            })
            .on('error', (channel, e) => {
                channel.send(`發生了些錯誤\n\`\`\`js${e}\`\`\``).catch((err) => console.log(err));
                console.error(e);
            })
            .on('finish', () => Channel().send('已經沒有歌曲!'))
            .on('disconnect', () => Channel().send('我離開語音頻道了 🙈').catch((e) => console.log(e)))
            .on('searchResult', (message, result) => {
                let i = 0;
                message.channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('請選擇你要的歌曲')
                            .setDescription(`${result.map((song) => `\`${++i}\` ${song.name} - \`${song.formattedDuration}\``).join('\n')}`)
                            .setFooter({ text: '隨意輸入或是等待60秒以取消' })
                            .setColor(es.color),
                    ],
                });
            })
            .on('searchCancel', (message) => message.channel.send('已經取消搜尋').catch((e) => console.log(e)))
            .on('searchInvalidAnswer', (message) => message.channel.send('無效回答'))
            .on('searchNoResult', (message) => message.channel.send('沒有結果').catch((e) => console.log(e)))
            .on('searchDone', () => { });
    } catch (e) {
        console.log(e);
    }
};
