const { ActivityType } = require('discord.js');
const { prefix } = require('../config.js');

module.exports = async (client) => {
    console.log(`${client.user.tag}, 成員數: ${client.guilds.cache.map((g) => g.memberCount).reduce((a, b) => a + b)} ，伺服器數: ${client.guilds.cache.size}`);
    const activity = () => client.user.setActivity(`${prefix}help | Made By Tails`, { type: ActivityType.Playing });
    activity();
    setInterval(activity, 600000);
};
