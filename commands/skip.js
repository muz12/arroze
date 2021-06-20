const Guild = require ("./database/Schemas/Guild")
    module.exports.run =  async (client, message, args) => {
        const server = await Guild.findOne({ id: message.guild.id })
        const player = message.client.manager.players.get(message.guild.id); 
        const queue = player.queue; 
        
        if (!player) return message.reply(`Você precisa de estar em um canal de voz. Use **${server.prefix}play** para meter música.`); //if the player is not playing anything, return.
        if (!player.playing) player.playing = true; 
        await message.react("⏩");
        player.stop(); 
    }
