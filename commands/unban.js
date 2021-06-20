const { MessageEmbed } = require("discord.js")
const db = require('quick.db');

module.exports.run =  async (client, message, args) => {

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**Você não tem as permissões para cancelar o banimento de alguém!**")

        if (!args[0]) return message.channel.send("**Por favor, digite um nome!**")
      
        let bannedMemberInfo = await message.guild.fetchBans()

        let bannedMember;
        bannedMember = bannedMemberInfo.find(b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || bannedMemberInfo.get(args[0]) || bannedMemberInfo.find(bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase());
        if (!bannedMember) return message.channel.send("**Forneça um nome de usuário, etiqueta ou ID válidos ou o usuário não será banido!**")

        let reason = args.slice(1).join(" ")

        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("**Você não tem as permissões para cancelar o banimento de alguém!**")
        try {
            if (reason) {
                message.guild.members.unban(bannedMember.user.id, reason)
                var sembed = new MessageEmbed()
                    .setColor("RAMDOM")
                    .setDescription(`**${bannedMember.user.tag} foi desbanido por ${reason}**`)
                    .addField("Moderador", message.author.username)
                    .setFooter(message.guild.name, message.guild.iconURL())
                    .setTimestamp();
                message.channel.send(sembed)
            } else {
                message.guild.members.unban(bannedMember.user.id, reason)
                var sembed2 = new MessageEmbed()
                    .setColor("RAMDOM")
                    .setDescription(`**${bannedMember.user.tag} foi desbanido**`)
                    .addField("Moderador", message.author.username)
                    .setFooter(message.guild.name, message.guild.iconURL())
                    .setTimestamp();
                message.channel.send(sembed2)
            }
        }  catch {

        }
            
    }
