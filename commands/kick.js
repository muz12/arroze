const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports. run =  async (client, message, args) => {
        try {
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Você não tem permissão para expulsar membros!");
            if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("Você não tem permissão para expulsar membros!");

            if (!args[0]) return message.channel.send('Digite um usuário para kickar!')

            var kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!kickMember) return message.channel.send(" O usuário não está na guilda!");

            if (kickMember.id === message.member.id) return message.channel.send("você não pode kickar a si mesmo!**")

            if (!kickMember.kickable) return message.channel.send("Não é possível expulsar este usuário!")
            if (kickMember.user.bot) return message.channel.send("**Não consigo kickar um bot!**")

            var reason = args.slice(1).join(" ");
            try {
                const sembed2 = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`**Você foi expulso de${message.guild.name} por - ${reason || "Sem razão!"}**`)
                    .setFooter(message.guild.name, message.guild.iconURL())
                kickMember.send(sembed2).then(() =>
                    kickMember.kick()).catch(() => null)
            } catch {
                kickMember.kick()
            }
            if (reason) {
            var sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${kickMember.user.username}** foi kickado por ${reason}`)
                .setFooter(message.guild.name, message.guild.iconURL())
                .setTimestamp()
            message.channel.send(sembed);
            } else {
                var sembed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${kickMember.user.username}** foi kickado`)
            message.channel.send(sembed2);
            }
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("Moderador", "kick")
                .addField("Usuário kickado", kickMember.user.username)
                .addField("**Kicked By**", message.author.username)
                .addField("Razão", `${reason || "Sem razão"}`)
                .addField("Data", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
