module.exports = async (client, oldState, newState) => {
    client.io.of('/i').emit('');
};
