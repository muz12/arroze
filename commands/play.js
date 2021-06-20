const { MessageEmbed } = require("discord.js")



  module.exports.run =  async (client, message, args) => {
    const { channel } = message.member.voice;

 

    if (!channel) return message.reply('Precisas de estar em um canal de voz.');
    if (!args.length) return message.reply('Você precisa me fornecer um URL ou um termo de pesquisa.');

    const player = message.client.manager.create({
      guild: message.guild.id,
      voiceChannel: channel.id,
      textChannel: message.channel.id,
      volume: 70,
      selfDeafen: true
    });

    player.connect();

    const search = args.join(' ');
    let res;

    try {
      res = await player.search(search, message.author);
      if (res.loadType === 'LOAD_FAILED') {
        if (!player.queue.current) player.destroy();
        throw new Error(res.exception.message);
      }
    } catch (err) {
      return message.reply(`Ocorreu um erro ao pesquisar: ${err.message}`);
    }

    switch (res.loadType) {
      case 'NO_MATCHES':
        if (!player.queue.current) player.destroy();
        return message.reply('Nenhum resultado foi encontado.');
      case 'TRACK_LOADED':
        player.queue.add(res.tracks[0]);

        if (!player.playing && !player.paused && !player.queue.length) player.play();
        return message.channel.send(`**Enqueuing** \`${res.tracks[0].title}\`.`);
      case 'PLAYLIST_LOADED':
        // ta certo o sistema de playlist '-' olha no discord
        if (player.playing) return player.queue.add(res.tracks);
        player.queue.add(res.tracks); // mais pera
        await player.play()

        if (!player.playing && !player.paused && player.queue.size === res.tracks.length) player.play();
        return message.reply(`**Na fila**: \n **${res.playlist.name}** : **${res.tracks.length} músicas**`);
      case 'SEARCH_RESULT':
        let max = 5, collected, filter = (m) => m.author.id === message.author.id && /^(\d+|end)$/i.test(m.content);
        if (res.tracks.length < max) max = res.tracks.length;

        const results = res.tracks
            .slice(0, max)
            .map((track, index) => `${++index} - \`${track.title}\``)
            .join('\n');
            
        const resultss = new MessageEmbed()
            .setDescription(results)
            .setColor('#d9d9d9')

        message.channel.send(resultss);
        message.channel.send("Tens 30 segundos para selecionar.")

        try {
          collected = await message.channel.awaitMessages(filter, { max: 1, time: 30e3, errors: ['time'] });
        } catch (e) {
          if (!player.queue.current) player.destroy();
          return message.reply("Você não forneceu uma seleção.");
        }

        const first = collected.first().content;

        if (first.toLowerCase() === 'end') {
          if (!player.queue.current) player.destroy();
          return message.channel.send('Seleção cancelada.');
        }

        const index = Number(first) - 1;
        if (index < 0 || index > max - 1) return message.reply(`O número e pequeno ou grande demais (1-${max}).`);

        const track = res.tracks[index];
        player.queue.add(track); 
        await player.play();
        return message.channel.send(`**Música:** \`${track.title}\`.`);
    }
  }
