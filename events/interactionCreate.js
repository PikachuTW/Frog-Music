const db = require('../handler/database.js');

module.exports = async (client, interaction) => {
    try {
        if (interaction.guildId !== '828450904990154802') return;
        if (!interaction.isCommand()) return;
        if (interaction.commandName === 'signup') {
            const username = interaction.options.data[0].value;
            const password = interaction.options.data[1].value;
            if (username.length > 12) {
                await interaction.reply({ content: '帳號名稱過長! (請不要大於12個字)', ephemeral: true });
                return;
            }
            if (password.length < 8) {
                await interaction.reply({ content: '密碼過短! (請最少8個字)', ephemeral: true });
                return;
            }
            if (password.length > 16) {
                await interaction.reply({ content: '密碼過長! (請不要大於30個字)', ephemeral: true });
                return;
            }
            if (/^[a-zA-Z0-9_]+$/g.test(username) === false) {
                await interaction.reply({ content: '帳號名稱只能包含英文、數字、底線!', ephemeral: true });
                return;
            }
            if (/^[a-zA-Z0-9_]+$/g.test(password) === false) {
                await interaction.reply({ content: '密碼只能包含英文、數字、底線!', ephemeral: true });
                return;
            }
            // eslint-disable-next-line no-restricted-syntax
            for (const [key, value] of db.entries()) {
                if (value.id === interaction.user.id) {
                    db.delete(key);
                    break;
                }
            }
            db.set(username, {
                id: interaction.user.id,
                password,
            });
            await interaction.reply({ content: `註冊成功! 你的帳號名稱為: \`${username}\``, ephemeral: true });
        } else if (interaction.commandName === 'dashboard') {
            await interaction.reply('[網址]');
        } else if (interaction.commandName === 'personal') {
            await interaction.reply('sb');
        }
    } catch {

    }
};
