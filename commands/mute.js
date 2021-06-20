const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports.run =  async (client, message, args) => {
        try {
            if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Você não tem permissão para silenciar alguém!");

            if (!message.guild.me.hasPermission("MANAGE_GUILD")) return message.channel.send("  você não tem permissão para silenciar alguém!")
            if (!args[0]) return message.channel.send("Digite um usuário a ser silenciado!");

            var mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!mutee) return message.channel.send(" Digite um usuário válido para ser silenciado!");

            if (mutee === message.member) return message.channel.send("  Você não pode silenciar a si mesmo!")
            if (mutee.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('Não é possível silenciar este usuário!')

            let reason = args.slice(1).join(" ");
            if (mutee.user.bot) return message.channel.send("Não é possível silenciar bots!");
            const userRoles = mutee.roles.cache
                .filter(r => r.id !== message.guild.id)
                .map(r => r.id)

            let muterole;
            let dbmute = await db.fetch(`muterole_${message.guild.id}`);
            let muteerole = message.guild.roles.cache.find(r => r.name === "mute")

            if (!message.guild.roles.cache.has(dbmute)) {
                muterole = muteerole
            } else {
                muterole = message.guild.roles.cache.get(dbmute)
            }

            if (!muterole) {
                try {
                    muterole = await message.guild.roles.create({
                        data: {
                            name: "muted",
                            color: "#514f48",
                            permissions: []
                        }
                    })
                    message.guild.channels.cache.forEach(async (channel) => {
                        await channel.createOverwrite(muterole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                            SPEAK: false,
                            CONNECT: false,
                        })
                    })
                } catch (e) {
                    console.log(e);
                }
            };

            if (mutee.roles.cache.has(muterole.id)) return message.channel.send(`${message.author} O usuário já está mutado!`)

            db.set(`muteeid_${message.guild.id}_${mutee.id}`, userRoles)
          try {
            mutee.roles.set([muterole.id]).then(() => {
                mutee.send(`Olá, você foi silenciado ${message.guild.name} por - ${reason || "Sem razão"}`).catch(() => null)
            })
            } catch {
                 mutee.roles.set([muterole.id])                               
            }
                if (reason) {
                const sembed = new MessageEmbed()
                    .setColor("RAMDOM")
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setDescription(`${mutee.user.username}  foi silenciado com sucesso por ${reason}`)
                message.channel.send(sembed);
                } else {
                    const sembed2 = new MessageEmbed()
                    .setColor("RAMDOM")
                    .setDescription(`${mutee.user.username}  foi silenciado com sucesso`)
                message.channel.send(sembed2);
                }
            
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (!channel) return;

            let embed = new MessageEmbed()
                .setColor('RED')
                .setThumbnail(mutee.user.displayAvatarURL({ dynamic: true }))
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .addField("Moderação", "mute")
                .addField("Mute", mutee.user.username)
                .addField("Moderador", message.author.username)
                .addField("Razão", `${reason || "Sem Razão"}`)
                .addField("Data", message.createdAt.toLocaleString())
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
                .setTimestamp()

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        } catch {
            return;
        }
    }
