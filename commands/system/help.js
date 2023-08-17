const { readdirSync } = require('fs');
const { EmbedBuilder } = require('discord.js');
const { es, prefix } = require('../../config.js');

module.exports = {
    aliases: ['h'],
    permLevel: 'User',
    run: async (client, message, args) => {
        const { container } = client;

        if (!args[0]) {
            const list = new Map([
                ['music', '音樂'],
                ['system', '系統'],
            ]);

            const exampleEmbed = new EmbedBuilder()
                .setColor(es.color)
                .setTitle('指令列表')
                .setFooter({ text: es.text, iconURL: es.icon });

            const folders = readdirSync('./commands/');
            const fieldList = [];
            folders.forEach((folder) => {
                const cmds = readdirSync(`./commands/${folder}/`).filter((file) => file.endsWith('.js'));
                let res = '';
                cmds.forEach((file) => {
                    try {
                        res += `\`${prefix}${file.split('.')[0]}\` `;
                    } catch (error) {
                        console.log(`${error}`);
                    }
                });
                fieldList.push({ name: `${list.get(folder)}`, value: res });
            });
            exampleEmbed.addFields(fieldList);
            message.reply({ embeds: [exampleEmbed] });
        } else {
            let command = args[0];
            if (container.commands.has(command)) {
                command = container.commands.get(command);
                message.channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(command.name)
                            .setColor(es.color)
                            .addFields({ name: '別名', value: command.aliases.length > 0 ? command.aliases.join(', ') : '無' })
                            .setFooter({ text: es.text, iconURL: es.icon }),
                    ],
                });
            }
        }
    },
};
