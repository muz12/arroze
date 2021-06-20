const prefix = require ("./prefix")
const db = require("quick.db")
const Guild = require ("./database/Schemas/Guild")


module.exports.run =  async(client, message, args) => {
        //prefix checking and fetching
        const server = await Guild.findOne({ id: message.guild.id })
        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            prefix = prefix
        } else {
            prefix = fetched
        }


		const player = message.client.manager.players.get(message.guild.id); // get the player

		if (isNaN(args[0])) return message.channel.send('Número inválido.'); //check if the args provided by the user is a number or not.

        //return error message if the command is used to remove the current playing song
        if (args[0] == 0) return message.channel.send(`Não é possível remover uma música que já está tocando. Para pular o tipo de música: \`${server}skip\``); 

        if (args[0] > player.queue.length) return message.channel.send('Song not found.'); //check to see if the song exists in the queue.

        const { title } = player.queue[args[0] - 1]; //grab the title of, to be removed song

        player.queue.splice(args[0] - 1, 1); //remove the song using the splice property

        return message.channel.send(`A música ***${title}*** foi removida do queue`); 
	}
