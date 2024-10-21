const { ChannelType } = require('discord.js');

let targetVoiceChannel = null;
let targetTextChannel = null;

module.exports = {
    name: 'track',
    description: 'Tracks a specified voice channel and sends notifications to a text channel.',
    execute(message, args) {
        const voiceChannelName = args[0];
        const textChannelName = args[1];

        if (!voiceChannelName || !textChannelName) {
            message.channel.send('Please provide both a voice channel name and a text channel name.');
            return;
        }

        const voiceChannel = message.guild.channels.cache.find(channel => channel.name === voiceChannelName && channel.type === ChannelType.GuildVoice);
        const textChannel = message.guild.channels.cache.find(channel => channel.name === textChannelName && channel.type === ChannelType.GuildText);

        if (!voiceChannel) {
            message.channel.send(`Invalid or inaccessible voice channel: ${voiceChannelName}. Please check the channel name and try again.`);
            return;
        }

        if (!textChannel) {
            message.channel.send(`Invalid or inaccessible text channel: ${textChannelName}. Please check the channel name and try again.`);
            return;
        }

        targetVoiceChannel = voiceChannel;
        targetTextChannel = textChannel;

        message.channel.send(`Now tracking the voice channel "${voiceChannel.name}". Notifications will be sent to the text channel "${textChannel.name}".`);

        message.client.on('voiceStateUpdate', (oldState, newState) => {
            if (targetVoiceChannel && newState.channelId === targetVoiceChannel.id && oldState.channelId !== targetVoiceChannel.id) {
                if (targetTextChannel) {
                    targetTextChannel.send(`${newState.member.user.username} has joined ${targetVoiceChannel.name}! Join the call!`);
                }
            }
        });
    },
};
