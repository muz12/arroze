const { MessageEmbed } = require("discord.js");
const Guild = require ("./database/Schemas/Guild")
  module.exports.run = async(bot, message, args) => {
    const server = await Guild.findOne({ id: message.guild.id })
    const player = message.client.manager.players.get(message.guild.id);
    if (!player) return message.reply(`Você precisa de estar em um canal de voz. Use **${server.prefix}play** para meter música.`);

    const queue = player.queue;
    const embed = new MessageEmbed().setAuthor(`Fila para ${message.guild.name}`);

    const multiple = 10;
    const page = args.length && Number(args[0]) ? Number(args[0]) : 1;

    const end = page * multiple;
    const start = end - multiple;

    const tracks = queue.slice(start, end);

    if (queue.current) embed.addField("Atualmente", `[${queue.current.title}](${queue.current.uri})`);

    if (!tracks.length) embed.setDescription(`Sem faixas ${page > 1 ? `page ${page}` : "adicionadas"}.`);
    else embed.setDescription(tracks.map((track, i) => `${start + (++i)} - [${track.title}](${track.uri})`).join("\n"));

    const maxPages = Math.ceil(queue.length / multiple);

    embed.setFooter(`Página ${page > maxPages ? maxPages : page} de ${maxPages}`);

    return message.reply(embed);
  }