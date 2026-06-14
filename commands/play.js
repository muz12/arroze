const Discord = require("discord.js")
const ytdl = require("@distube/ytdl-core")
const yts = require("yt-search")
const { getQueue, setQueue, deleteQueue } = require("./utils/musicQueue")

module.exports.run = async (client, message, args) => {
    const voiceChannel = message.member.voice.channel
    if (!voiceChannel)
        return message.reply("🚨 Tens de estar num canal de voz para usar este comando!")

    if (!args[0])
        return message.reply("🚨 Diz-me o nome da música ou um link do YouTube! Exemplo: `!play numa boa`")

    const permissions = voiceChannel.permissionsFor(client.user)
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK"))
        return message.reply("🚨 Não tenho permissão para entrar ou falar nesse canal de voz!")

    const existingQueue = getQueue(message.guild.id)
    if (existingQueue && existingQueue.voiceChannel.id !== voiceChannel.id)
        return message.reply("🚨 Já estou a tocar música noutro canal de voz neste servidor!")

    const query = args.join(" ")
    let song

    try {
        if (ytdl.validateURL(query)) {
            const info = await ytdl.getBasicInfo(query)
            song = {
                title: info.videoDetails.title,
                url: info.videoDetails.video_url,
                requestedBy: message.author.tag
            }
        } else {
            const results = await yts(query)
            const video = results.videos[0]
            if (!video) return message.reply("🚨 Não encontrei nenhuma música com esse nome!")
            song = {
                title: video.title,
                url: video.url,
                requestedBy: message.author.tag
            }
        }
    } catch (err) {
        console.error("Erro ao procurar música: " + err)
        return message.reply("🚨 Ocorreu um erro ao procurar essa música!")
    }

    let queue = existingQueue

    if (!queue) {
        queue = setQueue(message.guild.id, {
            voiceChannel,
            connection: null,
            dispatcher: null,
            textChannel: message.channel,
            songs: [song],
            volume: 100,
            loop: false
        })

        try {
            queue.connection = await voiceChannel.join()
        } catch (err) {
            console.error("Erro ao entrar no canal de voz: " + err)
            deleteQueue(message.guild.id)
            return message.reply("🚨 Não consegui entrar no canal de voz!")
        }

        playSong(message.guild.id)
    } else {
        queue.songs.push(song)

        let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`🎶 Adicionado à fila: **${song.title}**`)
            .setFooter(`Pedido por: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

        message.channel.send(embed)
    }
}

// Toca a próxima música da fila (ou sai do canal se a fila estiver vazia)
async function playSong(guildId) {
    const queue = getQueue(guildId)
    if (!queue) return

    const song = queue.songs[0]
    if (!song) {
        try { queue.voiceChannel.leave() } catch (err) { /* ignora erros ao saír */ }
        return deleteQueue(guildId)
    }

    try {
        const stream = ytdl(song.url, {
            filter: "audioonly",
            highWaterMark: 1 << 25
        })

        const dispatcher = queue.connection.play(stream)
            .on("finish", () => {
                if (queue.loop) {
                    queue.songs.push(queue.songs.shift())
                } else {
                    queue.songs.shift()
                }
                playSong(guildId)
            })
            .on("error", err => {
                console.error("Erro no dispatcher: " + err)
                queue.songs.shift()
                playSong(guildId)
            })

        dispatcher.setVolumeLogarithmic(queue.volume / 100)
        queue.dispatcher = dispatcher

        let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`🎵 A tocar agora: **${song.title}**`)
            .setFooter(`Pedido por: ${song.requestedBy}`)

        queue.textChannel.send(embed)
    } catch (err) {
        console.error("Erro ao tocar música: " + err)
        queue.songs.shift()
        playSong(guildId)
    }
}

module.exports.playSong = playSong
