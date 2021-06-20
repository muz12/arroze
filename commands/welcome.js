const Guild = require ("./database/Schemas/Guild")
const discord = require ("discord.js")

module.exports.run = async (client, message, args) => {
    let canal = message.mentions.channels.first() || message.guild.channels.cache.find((x) => x.id == args[1])
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`${message.author}, você precisa da permissão **MANAGE_GUILD** para executar este comando.`)
    Guild.findOne({ id: message.guild.id }, async function(err, server) {
        if(args[0] == "canal") {

            if (!canal) {
                return message.channel.send(`${message.author}, você não inseriu o ID/não mencionou nenhum canal para eu setar como canal de **welcome**.`)
            } else if (canal.id === server.welcome.channel) {
                return message.channel.send(`${message.author}, o canal inserido é o mesmo setado atualmente.`)
            } else {
                message.channel.send(`${message.author}, canal **<#${canal.id}>** setado como canal de **Welcome** com sucesso.`)
                server.welcome.channel = canal.id
                server.save()
            }
            return
        }

        if (args[0] == "msg") {
            let msg = args.slice(1).join(" ");

            if(!msg) {
                return message.channel.send(`${message.author}, você não inseriu nenhuma mensagem.`)
            } else if (msg.length > 100) {
                return message.channel.send(`${message.author}, a mensagem inserida é muito grande, o limite de caracteres é de **100**.`)
            } else if (msg == server.welcome.message) {
                return message.channel.send(`${message.author}, a mensagem inserida é a mesma setada atualmente.`)
            } else {
                message.channel.send(`${message.author}, a mensagem de welcome do servidor foi alterada para\n\`\`\`diff\n- ${msg}\`\`\``)
                server.welcome.msg = args.slice(1).join(' ')
                server.save()
            }
            return
        }

        if (args[0] == "on") {
            if (server.welcome.status) {
                return message.channel.send(`${message.author}, o sistema já se encontra ativado.`)
            } else {
                message.channel.send(`${message.author}, sistema de welcome ativado com sucesso.`)
                server.welcome.status = true
                server.save()
            }
            return
        }

        if (args[0] == "off") {
            if (!server.welcome.status) {
                return message.channel.send(`${message.author}, o sistema já se encontra desativado.`)
            } else {
                message.channel.send(`${message.author}, sistema de welcome desativado com sucesso.`)
                server.welcome.status = false
                server.save()
            }
            return
        }

        
        let info = new discord.MessageEmbed()
        .setAuthor(`${message.guild.name} - Sistema de Welcome`,message.guild.iconURL({ dynamic: true }))
        .setDescription(` > **{name}** - coloca o nome do membro\n> **{total}** - pega o total de membros na guild\n> **{guildName}** - pega o nome do servidor`)
        .addFields({
            name: "Canal Setado",
            value: server.welcome.channel == "null" ? "Nenhum Canal" : `<#${server.welcome.channel}>`
        },
        {
            name: "Mensagem Setada",
            value: server.welcome.msg == "null" ? "Nenhuma Mensagem" : `\`\`\`diff\n- ${server.welcome.msg}\`\`\``,
        },
        {
            name: "Status do Sistema",
            value: `No momento o sistema se encontra **${server.welcome.status ? "ativado" : "desativado"}**.`,
        
        }
        )

        .setColor('RAMDOM')
        .setFooter( `Comando requisitado por ${message.author.username}`,message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()

        return message.channel.send(info)
        



        
       
    })
}
