const clean = async (client, text) => {
    let value = text;
    if (value && value.constructor.name === 'Promise') { value = await value; }
    if (typeof value !== 'string') { value = require('util').inspect(value, { depth: 3 }); }

    value = value
        .replace(/`/g, `\`${String.fromCharCode(8203)}`)
        .replace(/@/g, `@${String.fromCharCode(8203)}`);

    value = value.replaceAll(client.token, '[REDACTED]');

    return value;
};

module.exports = {
    aliases: [],
    permLevel: 'Tails',
    run: async (client, message, args) => {
        const code = args.join(' ');
        try {
            // eslint-disable-next-line no-eval
            const evaled = eval(code);
            const cleaned = await clean(client, evaled);
            if (cleaned.startsWith('<ref *1>')) return;
            message.channel.send(`\`\`\`js\n${cleaned}\`\`\``);
            console.log(`${cleaned}`, 'eval');
        } catch (err) {
            message.channel.send(`\`\`\`js\n${err}\`\`\``);
            console.log(`${err}`, 'error');
        }
    },
};
