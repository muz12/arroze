const Discord = require ("discord.js")
const moment = require ("moment")




module.exports.run = async (client, message , args) => {
    moment.locale ('pt-br')

    const members = message.guild.members.cache
    let boost = message.guild.premiumSubscriptionCount === 0 ? "Nenhum boost" : `${message.guild.premiumSubscriptionCount} Boost(s) ( Level server: ${message.guild.premiumTir})` //para ver se existe boost ou não


      
    let channels = [
        `💯Categoria: ${message.guild.channels.cache.filter(x => x.type == "category").size}`,
        `📋texto: ${message.guild.channels.cache.filter(x => x.type == "text").size}`,
        `🎤Voz: ${message.guild.channels.cache.filter(x => x.type == "voice").size}`
    ].join ("\n")

    const embed = new Discord.MessageEmbed()
    .setTitle(` 🗂${message.guild.name}`)
    .addFields(
        {name: "💻Id do Servidor:", value: message.guild.id}, 
        {name: "👑Dono:", value: message.guild.owner.user.tag},
        {name: "🗓️Data de Criação:", value: `${moment(message.guild.createdAt).format("L")}.( ${moment(message.guild.createdAt).startOf("day").fromNow()} )`},
        {name: "📅Data de entrada:", value: `${moment(message.guild.member(client.user.id).joinedAt).format("L")} ( ${moment(message.guild.member(client.user.id).joinedAt).startOf("day").fromNow()})`},
        {name: "🚀boosters", value: boost},
        {name: `💭Canais: ( ${message.guild.channels.cache.size})`, value: channels},
        {name: "🗺️Region", value: message.guild.region },
        {name: `**🤖 Bots**: ${message.guild.members.cache.filter(x => x.user.bot).size.toLocaleString()}`, value: '\u200B'},
        {name: `**👭Membros**: ${message.guild.memberCount.toLocaleString()}`, value: '\u200B', },
        
        
    )
        .setThumbnail(message.guild.iconURL({dynamic: true}))
        .setColor("BLUE")
        .setTimestamp()



        message.channel.send(embed)
     

        

    
}