
const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
const db = require("../mongodb");

module.exports = {
  name: 'cow',
  aliases: ['randomcow', 'moo'],
  description: 'Displays a random cow image',
  async execute(message, args) {
    try {
      const response = await axios.get('https://api.unsplash.com/photos/random?query=cow&client_id=pOp57EKr6qpr6Y0FxE2aVS8pJxGh1z2RCIP-e7QYdRw');
      const imageUrl = response.data?.urls?.regular;

      if (!imageUrl) {
        throw new Error('Failed to fetch cow image.');
      }

      const embed = new EmbedBuilder()
        .setColor('#FFFFFF')
        .setTitle('Random Cow Image 🐮')
        .setImage(imageUrl);

      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error fetching cow image:', error);
      message.reply('Sorry, I couldn\'t fetch a cow image at the moment.');
    }
  },
};
