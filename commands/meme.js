const randomPuppy = require('random-puppy');
const Discord = require('discord.js');

module.exports.run =  async  (client, message, args) => {
        const subReddits = ["dankmeme", "meme", "memes"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]

        const img = await randomPuppy(random);

        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(img)
        .setTitle(`Seu meme, senhor / senhora. A partir de r/${random}`)
        .setURL(`https://reddit.com/r/${random}`)

        message.channel.send(embed);
    }
