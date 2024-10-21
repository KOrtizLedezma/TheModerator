const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Displays a list of all commands available.',
    execute(message) {
        const helpEmbed = new EmbedBuilder()
            .setColor(0x1E90FF)
            .setTitle('🤖 Bot Help Commands')
            .setDescription('Here are the available commands for the bot to help you navigate:')
            .setThumbnail('https://example.com/your-thumbnail-image.png')
            .addFields(
                { name: '💬 !help', value: 'Displays this help message.', inline: true },
                { name: '📡 !track <voiceChannel> <textChannel>', value: 'Tracks a specified voice channel and sends a notification to a text channel when someone joins.' },
                { name: '🏓 !ping', value: 'Replies with "Pong!" to check if the bot is responsive.', inline: true },
                { name: '🎲 !rollfight', value: 'Starts a roll fight for people who want to join by typing !join.' },
                { name: '👥 !join', value: 'Joins you in the roll fight if there is one happening.', inline: true },
                { name: '🎲 !roll', value: 'Returns a random number in the 1-100 range.'}
            )
            .setTimestamp()
            .setFooter({
                text: 'Thank you for using the bot! Let me know if you need anything else.',
                iconURL: 'https://example.com/your-footer-icon.png',
            })
            .setAuthor({
                name: 'The Moderator',
                // iconURL: 'https://example.com/your-author-icon.png',
                // url: 'https://your-website.com'
            });

        message.channel.send({ embeds: [helpEmbed] });
    },
};
