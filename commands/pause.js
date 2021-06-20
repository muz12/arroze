const Guild = require ("./database/Schemas/Guild")
   module.exports.run =  async(client, message, args) => {
      const server = await Guild.findOne({ id: message.guild.id })
      const player = message.client.manager.players.get(message.guild.id);
      if (!player) return message.reply(`Você precisa de estar em um canal de voz. Use **${server.prefix}play** para meter música.`);
  
      const { channel } = message.member.voice;
      
      if (!channel) return message.reply("Você precisa entrar em um canal de voz.");
      if (channel.id !== player.voiceChannel) return message.reply("Você não está no mesmo canal de voz.");
      if (player.paused) return message.reply("A música já está pausada.");
  
      player.pause(true);
      return message.reply("Música pausada<:pausebutton:843204457521086474>.");
    }
  