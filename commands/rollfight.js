const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'rollfight',
    description: 'Starts a roll fight. Members can join for a chance to win!',
    execute(message) {

        message.channel.send(`A roll fight is starting! Type "!join" to participate! You have 15 seconds to join.`);

        const participants = new Set();
        const filter = response => response.content.toLowerCase() === '!join' && !response.author.bot;

        const collector = message.channel.createMessageCollector({ filter, time: 15000 });

        collector.on('collect', response => {
            if (!participants.has(response.author.id)) {
                participants.add(response.author.id);
                message.channel.send(`${response.author.username} has joined the fight!`);
            } else {
                response.reply(`You are already in the fight!`);
            }
        });

        collector.on('end', collected => {
            if (participants.size > 0) {
                let participantsList = [];
                let rolls = [];

                participants.forEach(id => {
                    const user = message.guild.members.cache.get(id);
                    if (user) {
                        const roll = Math.floor(Math.random() * 100) + 1;
                        participantsList.push({ username: user.user.username, roll: roll });
                        rolls.push(`${user.user.username} rolled a ${roll}`);
                    }
                });

                participantsList.sort((a, b) => b.roll - a.roll);

                const winner = participantsList[0];

                const resultEmbed = new EmbedBuilder()
                    .setColor(0xFFD700)
                    .setTitle('Roll Fight Results')
                    .setDescription('Here are the results of the roll fight:')
                    .addFields(
                        ...participantsList.map(participant => {
                            return { name: participant.username, value: `Roll: ${participant.roll}`, inline: true };
                        })
                    )
                    .addFields({ name: '\u200B', value: '\u200B' })
                    .addFields({ name: '🏆 Winner', value: `**${winner.username}** with a roll of ${winner.roll}! 🎉` })
                    .setImage('https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGpwcWFuazNncWdiMTY2YzJpOTUwNnRuZ2ozZGlmNjdsNmt6ZDdtayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FMapondVtL2Fi/giphy.gif')
                    .setFooter({ text: 'Thank you to all participants! Better luck next time to those who didn\'t win.' });

                message.channel.send({ embeds: [resultEmbed] });

            } else {
                const resultEmbed = new EmbedBuilder()
                    .setColor(0xFFD700)
                    .setTitle('Roll Fight Status')
                    .setDescription('No one joined the fight. Maybe next time!')
                    .setFooter({ text: 'You need at least one person to fight' });

                message.channel.send({ embeds: [resultEmbed] });
            }
        });
    },
};
