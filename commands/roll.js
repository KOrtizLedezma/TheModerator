module.exports = {
    name: 'roll',
    description: 'Returns a random number in the 1-100 range',
    execute(message) {
        const roll = Math.floor(Math.random() * 100) + 1;
        message.channel.send(`${roll}`);
    },
};
