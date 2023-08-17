/* eslint-disable prefer-promise-reject-errors */
const Discord = require('discord.js');
const config = require('./config.js');

/**
 *
 * @param {*} message
 * @returns number/boolean
 */
const onCooldown = async (message) => {
    if (!message || !message.client) return false;
    const { client } = message;
    const stamp = client.container.cooldown.get(message.author.id) || 0;
    const now = Date.now();
    if (now - stamp < 2000 && message.author.id !== '650604337000742934') {
        return ((2000 - (now - stamp)) / 1000).toPrecision(2);
    }
    return false;
};

/**
   *
   * @param {*} message
   * @param {*} args
   * @returns member
   */
const getUser = (message, args) => {
    if (!args[0]) return undefined;
    if (args[0].matchAll(Discord.MessageMentions.USERS_PATTERN).next().value) {
        return message.guild.members.cache.get(args[0].matchAll(Discord.MessageMentions.USERS_PATTERN).next().value[1]);
    }
    return message.guild.members.cache.get(args[0]);
};

/**
   *
   * @param {*} date Timestamp
   * @returns Time string in Taiwan timezone
   */
const formatDate = (date) => new Date(date).toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });

/**
   *
   * @param {*} time
   * @returns Promise
   */
const delay = (time) => {
    try {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(2);
            }, time);
        });
    } catch (e) {
        console.log(String(e.stack).bgRed);
    }
};

/**
   *
   * @param {*} max
   * @returns 0 ~ MAX random number
   */
const getRandomInt = (max) => {
    try {
        return Math.floor(Math.random() * Math.floor(max));
    } catch (e) {
        console.log(String(e.stack).bgRed);
    }
};

/**
   *
   * @param {*} min
   * @param {*} max
   * @returns min ~ max random number
   */
const getRandomNum = (min, max) => {
    try {
        return Math.floor(Math.random() * Math.floor((max - min) + min));
    } catch (e) {
        console.log(String(e.stack).bgRed);
    }
};

/**
   *
   * @param {*} millis Number | Time in milliseconds
   * @returns HH:MM:SS || MM:SS
   */
const format = (millis) => {
    try {
        const h = Math.floor(millis / 3600000);
        const m = Math.floor(millis / 60000);
        const s = ((millis % 60000) / 1000).toFixed(0);
        if (h < 1) return `${(m < 10 ? '0' : '') + m}:${s < 10 ? '0' : ''}${s}`;
        return `${(h < 10 ? '0' : '') + h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    } catch (e) {
        console.log(String(e.stack).bgRed);
    }
};

/**
 *
 * @param {*} target
 * @returns Number
 */
const permlevel = (target) => {
    let permlvl = 0;

    const permOrder = config.permLevels.slice(0).sort((p, c) => (p.level < c.level ? 1 : -1));

    while (permOrder.length) {
        const currentLevel = permOrder.shift();
        if (currentLevel.check(target)) {
            permlvl = currentLevel.level;
            break;
        }
    }
    return permlvl;
};

/**
 *
 * @param {*} message
 * @returns message
 */
const checkCC = (message) => {
    let res;
    const Channel = message.member.voice.channel;
    if (!Channel) {
        res = message.reply('請連接到語音頻道');
    } else if (message.guild.members.me.voice.channel && message.guild.members.me.voice.channel.id !== Channel.id) {
        res = message.reply('請加入我的語音頻道');
    }
    return res;
};

module.exports = {
    onCooldown,
    getUser,
    formatDate,
    delay,
    getRandomInt,
    getRandomNum,
    format,
    permlevel,
    checkCC,
};
