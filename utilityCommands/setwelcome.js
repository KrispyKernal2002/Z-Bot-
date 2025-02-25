
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'setwelcome',
  description: 'Set the channel for welcome messages',
  execute(message, args) {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      return message.reply('You need the Manage Channels permission to use this command.');
    }

    const channel = message.mentions.channels.first();
    if (!channel) {
      return message.reply('Please mention a channel to set as the welcome channel.');
    }

    const settingsPath = path.join(__dirname, '..', 'data', 'welcomeSettings.json');
    let settings = {};
    
    if (fs.existsSync(settingsPath)) {
      settings = JSON.parse(fs.readFileSync(settingsPath));
    }

    settings[message.guild.id] = {
      guildId: message.guild.id,
      welcomeChannelId: channel.id
    };

    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

    const embed = new EmbedBuilder()
      .setColor('#2b71ec')
      .setDescription(`Welcome messages will now be sent to ${channel}`);
    
    message.reply({ embeds: [embed] });
  },
};
