const discord = require ("discord.js")
const Guild = require ('../commands/database/Schemas/Guild')

module.exports.run = async (client, message , args) => {
    
    const server = await Guild.findOne({ id: message.guild.id })


    const embed = new discord.MessageEmbed()
    .setTitle('`Pedra | Papel | Tesoura`')
    .setDescription('Reage para jogares')
    .setTimestamp()

    let msg = await message.channel.send(embed)

    await msg.react("🪨")
    await msg.react("✂️")
    await msg.react("📰")

    const filter = (reaction, user) => {
        return ['🪨', '✂️', '📰'].includes(reaction.emoji.name) && user.id === message.author.id
    }

    const choises = ['🪨', '✂️', '📰']
    const me = choises[Math.floor(Math.random() * choises.length)]
    msg.awaitReactions(filter, {max: 1, time: 60000, error: ["time"]}).then(
        async(collected)  => {
            const reaction = collected.first()
            const resultado = new discord.MessageEmbed()
            .setTitle('Resultado')
            .addField(`${message.author.tag}`, `${reaction.emoji.name}`)
            .addField("Arroze", `${me}`)
            await msg.edit(resultado)

           if((me === "🪨" && reaction.emoji.name === "✂️") || 
           (me === "✂️" && reaction.emoji.name === "📰>") ||
           (me === "📰" && reaction.emoji.name === "🪨")) {
            message.reply(`\`\`\`diff\n- Não fiques assim ele apenas é um robo ${server.prefix}ppt\`\`\``)
           } else if(me === reaction.emoji.name) {
               return message.reply(`\`\`\`diff\n- Para a próxima terás mais sorte ${server.prefix}ppt para tentares a tua sorte\`\`\``)
           } else {
               return message.reply(`\`\`\`diff\n- Parabéns, para jogares novamente faz ${server.prefix}ppt\`\`\``)
           }   
        })
       .catch(collected => {
           message.reply(`\`\`\`diff\n-O tempo esgotou-se para poderes jogar usa ${server.prefix}ppt \`\`\``)
       })
}