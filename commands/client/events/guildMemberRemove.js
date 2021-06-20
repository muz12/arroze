const Guild = require ("../../database/Schemas/Guild")

module.exports.run = async (client, member) => {
    let guild = member.guild
    Guild.findOne({ id: guild.id }, async function(err, server) {
        if (server.byebye.status) {
            client.channels.cache.get(server.byebye.channel).send(server.byebye.msg.replace(/{member}/g, `${member.user.username}`)
            .replace(/{total}/g, guild.memberCount)
            .replace(/{guildName}/g, guild.name))
             
        }
    })
}