module.exports = {
    prefix: 'f!',
    es: {
        text: 'Frog Music',
        icon: 'https://i.imgur.com/wtXqrf3.png',
        color: '#9FFF00',
        wrong: '#FF0000',
    },
    annChannel: '983731677216002048',
    permLevels: [
        {
            level: 0,
            name: 'User',
            check: () => true,
        },

        {
            level: 1,
            name: 'DJ',
            check: (member) => {
                try {
                    if (member.roles.cache.has('870741338960830544') || member.roles.cache.has('990163141826588732')) return true;
                } catch (e) {
                    return false;
                }
            },
        },

        {
            level: 2,
            name: 'Tails',
            check: (member) => member.id === '650604337000742934',
        },
    ],
};
