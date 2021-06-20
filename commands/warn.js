const { MessageEmbed } = require('discord.js')

module.exports.run =  async (client, message, args) => {
        let warnPermErr = new MessageEmbed()
        .setTitle("Erro de permissão do usuário!")
        .setDescription("Desculpe, você não tem permissão para usar este comando! ❌")
            if(!message.channel.permissionsFor(message.member).has(['MANAGE_MESSAGES'])) return message.channel.send(warnPermErr);
    
            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if(!member) return message.reply("Por favor, mencione um membro válido deste servidor");
        
            let reason = args.slice(1).join(' ');
            if(!reason) reason = "(Nenhum motivo fornecido)";
            
            member.send(`Você foi avisado por ${message.author.username} por esta razão: ${reason}`)
            .catch(error => message.channel.send(`Desculpe <${message.author}> Não pude deixar de avisar por causa de : ${error}`));
            let warnEmbed = new MessageEmbed()
            .setTitle("**__Alerta Warn__**")
            .setDescription(`${member.user} foi avisado por ${message.author}`)
            .addField(`Razão:`, `\`${reason}\``)
            .addField(`Ação:`, `\`Warn\``)
            .addField(`Moderador:`, `${message.author}`)

            message.channel.send(warnEmbed)

    }
