const Guild = require ("./database/Schemas/Guild")
    module.exports.run = async  (client, message, args) => {
        const server = await Guild.findOne({ id: message.guild.id })
      const player = message.client.manager.players.get(message.guild.id);
  
      if (!player) return message.reply(`Você precisa de estar em um canal de voz. Use **${server.prefix}play** para meter música.`);
      if (!args.length) return message.reply(`O volume é \`${player.volume}\`.`)
  
      const { channel } = message.member.voice;
      
      if (!channel) return message.reply("Você precisa entrar em um canal de voz.");
      if (channel.id !== player.voiceChannel) return message.reply("Você não está no mesmo canal de voz.");
  
      const volume = Number(args[0]);
      
      if (!volume || volume < 1 || volume > 100) return message.reply("Você precisa me dar um volume entre 1 e 100.");
  
      player.setVolume(volume);
      return message.reply(`Feito | O volume agora é  \`${volume}\`.`);
    }
  