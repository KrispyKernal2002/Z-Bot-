
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'setlogchannel',
  description: 'Set the channel for voice activity logs',
  execute(message, args) {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      return message.reply('You need the Manage Channels permission to use this command.');
    }

    const channel = message.mentions.channels.first();
    if (!channel) {
      return message.reply('Please mention a channel to set as the voice log channel.');
    }

    const logSettings = {
      guildId: message.guild.id,
      logChannelId: channel.id
    };

    const settingsPath = path.join(__dirname, '..', 'data', 'voiceLogSettings.json');
    let settings = {};
    
    if (fs.existsSync(settingsPath)) {
      settings = JSON.parse(fs.readFileSync(settingsPath));
    }

    settings[message.guild.id] = logSettings;
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

    const embed = new EmbedBuilder()
      .setColor('#2b71ec')
      .setDescription(`Voice activity logs will now be sent to ${channel}`);
    
    message.reply({ embeds: [embed] });
  },
};
