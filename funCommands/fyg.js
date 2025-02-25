
const { EmbedBuilder } = require('discord.js');
const db = require("../mongodb");

module.exports = {
  name: 'fyg',
  description: 'Generates a random story about the Fuck You Guy',
  execute(message, args) {
    const locations = ['supermarket', 'park', 'library', 'coffee shop', 'bus stop', 'gym', 'mall', 'restaurant'];
    const actions = [
      'shouting "FUCK YOU!" at everyone in line',
      'telling the barista "fuck you" after getting his coffee order wrong',
      'walking up to random people saying "fuck you" and walking away',
      'putting up "fuck you" sticky notes on peoples\' belongings',
      'interrupting conversations with a loud "FUCK YOU!"',
      'sending "fuck you" messages on the public WiFi network'
    ];
    const endings = [
      'got banned for life while yelling one final "FUCK YOU!"',
      'was chased away by angry people who were tired of hearing "fuck you"',
      'disappeared mysteriously after writing "fuck you" on the wall',
      'found a worthy opponent who said "fuck you" back',
      'started a "fuck you" club',
      'became a local legend known as the mysterious "fuck you" guy'
    ];

    const location = locations[Math.floor(Math.random() * locations.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    const ending = endings[Math.floor(Math.random() * endings.length)];

    const story = `One day at the ${location}, the Fuck You Guy was ${action}. After causing maximum chaos, he ${ending}.`;

    const embed = new EmbedBuilder()
      .setColor('#FF0000')
      .setTitle('The Adventures of Fuck You Guy')
      .setDescription(story)
      .setFooter({ text: 'Another tale of chaos and mayhem' });

    message.reply({ embeds: [embed] });
  },
};
