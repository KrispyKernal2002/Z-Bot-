/*

   MADE BY RTX!! FEEL FREE TO USE ANY PART OF CODE


  ██████╗░████████╗██╗░░██╗           
  ██╔══██╗╚══██╔══╝╚██╗██╔╝          
  ██████╔╝░░░██║░░░░╚███╔╝░          
  ██╔══██╗░░░██║░░░░██╔██╗░          
  ██║░░██║░░░██║░░░██╔╝╚██╗          
  ╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝          

   FOR EMOJIS EITHER YOU CAN EDIT OR JOIN OUR DISCORD SERVER 
   SO WE ADD BOT TO OUR SERVER SO YOU GET ANIMATED EMOJIS.

   DISCORD SERVER : https://discord.gg/FUEHs7RCqz
   YOUTUBE : https://www.youtube.com/channel/UCPbAvYWBgnYhliJa1BIrv0A

   FOR HELP CONTACT ME ON DISCORD
   ## Contact    [ DISCORD SERVER :  https://discord.gg/c4kaW2sSbm ]

*/

const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const express = require('express');
require('dotenv').config();
const figlet = require('figlet');

const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((a) => {
    return GatewayIntentBits[a];
  }),
});
const { printWatermark } = require('./functions/handlers');
const prefixData = require('./prefix.json');
const prefix = prefixData.prefix;
const config = require('./config.json');

const youtubeApiKey = config.youtubeAPIKey;


const app = express();
const port = 3000;
app.get('/', (req, res) => {
  const imagePath = path.join(__dirname, 'index.html');
  res.sendFile(imagePath);
});
app.listen(port, () => {
  console.log(`🔗 Listening to RTX: http://localhost:${port}`);
  console.log(`🔗 Replit URL: https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`);
});
printWatermark();

client.commands = new Map();

const funCommandsPath = path.join(__dirname, 'funCommands');
const animeCommandsPath = path.join(__dirname, 'AnimeCommands');
const utilityCommandsPath = path.join(__dirname, 'utilityCommands');
const imageCommandsPath = path.join(__dirname, 'imageCommands');
const basicCommandsPath = path.join(__dirname, 'basicCommands');

const animeCommandFiles = fs.readdirSync(animeCommandsPath).filter((file) => file.endsWith('.js'));
const funCommandFiles = fs.readdirSync(funCommandsPath).filter((file) => file.endsWith('.js'));
const utilityCommandFiles = fs.readdirSync(utilityCommandsPath).filter((file) => file.endsWith('.js'));
const imageCommandFiles = fs.readdirSync(imageCommandsPath).filter((file) => file.endsWith('.js'));
const basicCommandFiles = fs.readdirSync(basicCommandsPath).filter((file) => file.endsWith('.js'));

for (const file of funCommandFiles) {
  const command = require(path.join(funCommandsPath, file));
  client.commands.set(command.name, command);
}

for (const file of animeCommandFiles) {
  const command = require(path.join(animeCommandsPath, file));
  client.commands.set(command.name, command);
}
for (const file of utilityCommandFiles) {
  const command = require(path.join(utilityCommandsPath, file));
  client.commands.set(command.name, command);
}

for (const file of imageCommandFiles) {
  const command = require(path.join(imageCommandsPath, file));
  client.commands.set(command.name, command);
}

for (const file of basicCommandFiles) {
  const command = require(path.join(basicCommandsPath, file));
  client.commands.set(command.name, command);
}

client.on('messageCreate', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);

  if (!command) return;

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command!');
  }
});


async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log('\x1b[32m%s\x1b[0m', '|    🍔 Bot logged in successfully!');
    console.log('\x1b[36m%s\x1b[0m', '|    🚀 Commands Loaded successfully!');
    console.log('\x1b[32m%s\x1b[0m', `|    🌼 Logged in as ${client.user.username}`);
    console.log('\x1b[36m%s\x1b[0m', `|    🏡 Bot is in ${client.guilds.cache.size} servers`);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Failed to log in:', error);
    console.log('\x1b[31m%s\x1b[0m', '❌ Client Not Login, Restarting Process...');
    process.kill(1);
  }
}


client.once('ready', () => {
  setTimeout(() => {
    console.log('\x1b[32m%s\x1b[0m', `|    🎯 Activity sucessfully set!`);
    client.user.setPresence({
      activities: [{ name: `Update Out V@1.2`, type: ActivityType.Watching }],
      status: 'idle',
    });
  }, 2000); 
});

// Welcome event handler
client.on('guildMemberAdd', member => {
  const settingsPath = path.join(__dirname, 'data', 'welcomeSettings.json');
  if (!fs.existsSync(settingsPath)) return;

  const settings = JSON.parse(fs.readFileSync(settingsPath));
  const guildSettings = settings[member.guild.id];
  if (!guildSettings) return;

  const welcomeChannel = member.guild.channels.cache.get(guildSettings.welcomeChannelId);
  if (!welcomeChannel) return;

  const embed = new EmbedBuilder()
    .setColor('#2b71ec')
    .setTitle('Welcome!')
    .setDescription(`Welcome ${member.user.tag} to the server! 🎉`)
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp();

  welcomeChannel.send({ embeds: [embed] });
});

// Leave event handler
client.on('guildMemberRemove', member => {
  const settingsPath = path.join(__dirname, 'data', 'leaveSettings.json');
  if (!fs.existsSync(settingsPath)) return;

  const settings = JSON.parse(fs.readFileSync(settingsPath));
  const guildSettings = settings[member.guild.id];
  if (!guildSettings) return;

  const leaveChannel = member.guild.channels.cache.get(guildSettings.leaveChannelId);
  if (!leaveChannel) return;

  const embed = new EmbedBuilder()
    .setColor('#ff4444')
    .setDescription(`${member.user.tag} has left the server 👋`)
    .setTimestamp();

  leaveChannel.send({ embeds: [embed] });
});

client.on('voiceStateUpdate', (oldState, newState) => {
  const settingsPath = path.join(__dirname, 'data', 'voiceLogSettings.json');
  if (!fs.existsSync(settingsPath)) return;

  const settings = JSON.parse(fs.readFileSync(settingsPath));
  const guildSettings = settings[oldState.guild.id];
  if (!guildSettings) return;

  const logChannel = oldState.guild.channels.cache.get(guildSettings.logChannelId);
  if (!logChannel) return;

  const member = oldState.member;
  const embed = new EmbedBuilder().setColor('#2b71ec').setTimestamp();

  // Joined a channel
  if (!oldState.channel && newState.channel) {
    embed.setDescription(`👋 **${member.user.tag}** joined voice channel **${newState.channel.name}**`);
  }
  // Left a channel
  else if (oldState.channel && !newState.channel) {
    embed.setDescription(`🚶 **${member.user.tag}** left voice channel **${oldState.channel.name}**`);
  }
  // Moved channels
  else if (oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id) {
    embed.setDescription(`↔️ **${member.user.tag}** moved from **${oldState.channel.name}** to **${newState.channel.name}**`);
  }
  // Mute status changed
  else if (oldState.mute !== newState.mute) {
    embed.setDescription(`🎤 **${member.user.tag}** was ${newState.mute ? 'muted' : 'unmuted'}`);
  }
  // Deafen status changed
  else if (oldState.deaf !== newState.deaf) {
    embed.setDescription(`🔇 **${member.user.tag}** was ${newState.deaf ? 'deafened' : 'undeafened'}`);
  }

  if (embed.data.description) {
    logChannel.send({ embeds: [embed] });
  }
});


login();


setInterval(() => {
  if (!client || !client.user) {
    console.log('\x1b[31m%s\x1b[0m', '❌ Client Not Logged in, Restarting Process...');
    process.kill(1);
  }
}, 15000);

module.exports = client;


/*
   MADE BY RTX!! FEEL FREE TO USE ANY PART OF CODE

  ██████╗░████████╗██╗░░██╗           
  ██╔══██╗╚══██╔══╝╚██╗██╔╝          
  ██████╔╝░░░██║░░░░╚███╔╝░          
  ██╔══██╗░░░██║░░░░██╔██╗░          
  ██║░░██║░░░██║░░░██╔╝╚██╗          
  ╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝          

   FOR EMOJIS EITHER YOU CAN EDIT OR JOIN OUR DISCORD SERVER 
   SO WE ADD BOT TO OUR SERVER SO YOU GET ANIMATED EMOJIS.

   DISCORD SERVER : https://discord.gg/FUEHs7RCqz
   YOUTUBE : https://www.youtube.com/channel/UCPbAvYWBgnYhliJa1BIrv0A

   FOR HELP CONTACT ME ON DISCORD
   ## Contact    [ DISCORD SERVER :  https://discord.gg/c4kaW2sSbm ]
*/