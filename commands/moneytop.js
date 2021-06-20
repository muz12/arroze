const { MessageEmbed } = require("discord.js");
const db = require('quick.db');;

exports.run = async (bot, message, args) => {
        let money = db.all().filter(lb => lb.ID.startsWith(`money_${message.guild.id}`)).sort((a, b) => b.data- a.data)
        let bankBalance = money.slice(0, 10)
        
        let content = " ";

        for(let i = 0; i < bankBalance.length; i++) {
            let user = bot.users.cache.get(bankBalance[i].ID.split('_')[2])

            content += `${i+1}. ${user} - \$${bankBalance[i].data} \n`

        }

        const embed = new MessageEmbed()
        .setColor("#000001")
        .setTitle(`${message.guild.name}\' Money top <:coins:832716297225502751> `)
        .setDescription(`** ${content} **`)
        .setTimestamp()

        message.channel.send(embed)
}