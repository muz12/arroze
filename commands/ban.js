  
const { MessageEmbed } = require('discord.js');

    module.exports.run = async (bot, message, args) => {
        message.delete()
        if(!message.member.hasPermission(`BAN_MEMBERS`)) return message.reply(`Você não tem permissão para usar este comando.`)
        let banMember = message.mentions.members.first();
        if(!banMember) return message.reply(`Você não mencionou um usuário para banir`)
        let banreason = args.slice(1).join(" ");
        if(!banreason) banreason = `Nenhum motivo especificado`;
        message.guild.members.ban(banMember, {reason: `Staff: ${message.author.tag} || Razão: ${banreason}`})
        message.reply(`${banMember} foi banido por ${message.author.tag} por ${banreason}.`)
    }
