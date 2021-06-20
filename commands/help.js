const Guild = require ("./database/Schemas/Guild")
module.exports.run = async (client, message, args) => {
    const server = await Guild.findOne({ id: message.guild.id })
    message.channel.send({
        embed: {
            color: 'RAMDOM',
            author: { name: 'Arroze - Help🛠️' },
            footer:{ text: 'Desenvolvedor Gomezzz#9093' },
            fields: [
                { name: 'Moderação', value: '`giveaway`, `clear`, `say`, `reroll`, `prefix`, `ban`, `byebye`, `kick`,`welcome`, `unban`,`mute`, `unmute`, `warn`, `lock`, `unlock`'},
                { name: 'Informações', value: '`botinfo`, `corona`, `help`, `serverinfo`, `userinfo`, `ping`, `avatar`, `servericon`, `uptime`, `invite`, `tempo`, `calendario`'},
                { name: 'Música', value: '`play`, `queue`, `remove`, `skip`, `pause`, `repeat`, `stop`, `volume`,`resume`'},
                { name: 'Economia', value: '`bal`, `comprar`, `daily`, `inventario`, `loja`,`work`, `moneytop`, `pay`'},
                { name: 'Diversão', value: '`galo`, `kiss`, `ppt`, `forca`, `coinflip`, `slap`, `dados`, `firstword`, `blackjack`, `slots`'}
            ],
            description: (`Em caso de duvida use **${server.prefix}nome do comando** **tudo junto**. Exemplo: **${server.prefix}helpwelcome**`),
            timestamp: new Date(),
          

        },
    });
}