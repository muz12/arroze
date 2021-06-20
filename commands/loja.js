const discord = require ("discord.js")

module.exports.run = async (client, message , args) => {

    const embed = new discord.MessageEmbed()
    .setTitle('`Loja`')
    .setDescription('🏎️Jaguar- 80000 coins\n 🕰️Rolex - 13000 coins\n 👟Nike Air force - 1100 coins\n 👖Calças - 999 coins\n 👕T-shirt Supreme - 740 coins\n 🏠Casa Simples - 25000 coins \n 🏡Casa Moderna - 100000 coins\n 🏘️Casa Rico - 500000 coins\n 📱Iphone 12 Pro Max - 5000 coins \n')
    .setTimestamp()

    message.channel.send(embed)
}