const discord = require ("discord.js")
exports.run = (client, message, args) => {

    var ping;
  
    ping = (Date.now() - message.createdTimestamp)
    let peso = ping > 1000 ? "16711680" : "55512"
  
    const embed = new discord.MessageEmbed()
    .setDescription(" **PING:** ㅤ\n\n📡**" + ping + "**ms") 
    .setColor("RAMDOM")
    .setFooter(`Pedido por: ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))

    message.channel.send(embed)
  }

