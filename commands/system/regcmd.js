const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    aliases: [],
    permLevel: 'Tails',
    run: async (client, message) => {
        const commands = [
            new SlashCommandBuilder()
                .setName('signup')
                .setDescription('註冊網路控制臺帳號')
                .addStringOption((options) => options
                    .setName('帳號名稱')
                    .setDescription('username')
                    .setRequired(true)
                    .setMaxLength(12))
                .addStringOption((options) => options
                    .setName('密碼')
                    .setDescription('password')
                    .setRequired(true)
                    .setMaxLength(30)
                    .setMinLength(8)),
            new SlashCommandBuilder()
                .setName('dashboard')
                .setDescription('網路控制臺連結'),
            new SlashCommandBuilder()
                .setName('personal')
                .setDescription('查看個人帳號資訊'),
        ];

        try {
            message.guild.commands.set(commands);
            message.reply('應用程式命令註冊成功!');
        } catch (error) {
            console.error(error);
            try {
                message.reply('應用程式命令註冊失敗 :frog:');
            } catch { }
        }
    },
};
