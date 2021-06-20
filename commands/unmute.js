const { MessageEmbed } = require("discord.js")
const db = require('quick.db');

module.exports.run =  async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Não tens permissão para desmutar!");

        if (!message.guild.me.hasPermission("MANAGE_GUILD")) return message.channel.send("Não tenho permissão para desmutar o som de alguém!")
        if (!args[0]) return message.channel.send("Insira um usuário!")
        let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!mutee) return message.channel.send(" Digite um usuário válido!");

        let reason = args.slice(1).join(" ");

        let muterole;
        let dbmute = await db.fetch(`muterole_${message.guild.id}`);
        let muteerole = message.guild.roles.cache.find(r => r.name === "muted")

        if (!message.guild.roles.cache.has(dbmute)) {
            muterole = muteerole
        } else {
            muterole = message.guild.roles.cache.get(dbmute)
        }
      
        let rolefetched = db.fetch(`muteeid_${message.guild.id}_${mutee.id}`)
        if (!rolefetched) return;

        if (!muterole) return message.channel.send("Não há função muda para remover!")
        if (!mutee.roles.cache.has(muterole.id)) return message.channel.send(`${message.author}O usuário não está silenciado!`)
        try {
        mutee.roles.remove(muterole.id).then(() => {
            mutee.send(`Olá, você foi desmutado ${message.guild.name} por ${reason || "Sem razãp"}`).catch(() => null)
            let roleadds = rolefetched
            if (!roleadds) return;
            mutee.roles.add(roleadds)
        })
        } catch {
            let roleadds2 = rolefetched
            if (!roleadds2) return;
            mutee.roles.add(roleadds2)                            
          }
            const sembed = new MessageEmbed()
                .setColor("RAMDOM")
                .setDescription(`${mutee.user.username}  foi desmutado com sucesso.`)
            message.channel.send(sembed);
        

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        let embed = new MessageEmbed()
            .setColor("RAMDOM")
            .setThumbnail(mutee.user.displayAvatarURL({ dynamic: true }))
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .addField("Moderação", "unmute")
            .addField("Unmuted", mutee.user.username)
            .addField("Moderador", message.author.username)
            .addField("Razão", `${reason || "Sem razão"}`)
            .addField("Data", message.createdAt.toLocaleString())
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setTimestamp();

        var sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send(embed)

    }
