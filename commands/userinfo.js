const Discord = require ("discord.js")
const moment = require ("moment")


module.exports.run = async (client, message, args) => {

    moment.locale('pt-PT')
    const user = message.guild.member(client.users.cache.get(args[0]) || message.mentions.members.first() || message.author ) //se ele digitar o comando pode pegar por id por menção ou se nao conlocar nada pega o info dele
    const ROLES = message.guild.member(user.id).roles.cache.filter((r) => r.id !== message.guild.id).map((roles) => roles)
    const userI = message.guild.member(user.id)

    let roles;
    if(!ROLES.length) roles = "Nenhum cargo"
    else roles = ROLES.length > 10 ? ROLES.map((r) => r ).slice(0, 10).join(", ") + `e mais ${ROLES.length - 10} cargos.` : ROLES.map((r) => r).join(", ")

    function Device(user) {
       if(!user.presence.clientStatus) return null;
       let devices = Object.keys(user.presence.clientStatus)
       let deviceList = devices.map((x) => {
           if(x === "desktop") return "💻Computador"
           else if (x === "mobile") return "📱Telemóvel"
           else return "🤖Bot"
       })
  
       return deviceList.join(" - ")
       
    }

    let status 
    switch(user.presence.status) {
        case "online":
            status = "🟢online";
        break
        case "dnd":
            status = "⛔ocupado"
        break
        case "idle":
            status = "🌙ausente"
        break
        case "offline":
            status = "🔘offline"

    } 

    let presence
    if(!user.presence.activities.length) presence = "Não está jogando nada"
    else presence = user.presence.activities.join(", ")

    const device = Device(user)
    const joined = `${moment(userI.joinedAt).format("L")} ( ${moment((userI).joinedAt).startOf('day').fromNow()} )`
    const created = `${moment(client.users.cache.get(user.id).createdAt).format("L")} ( ${moment(client.users.cache.get(user.id).createdAt).startOf('day').fromNow() } )`

    const embed = new Discord.MessageEmbed()
    .setAuthor(user.user.username, user.user.displayAvatarURL({dynamic: true}))
    .addFields(
        {name: "👩‍💻Jogando:", value: `\`\`\`diff\n- ${presence}\`\`\``},
        {name: "👦Membro:", value: user.user.tag, inline: true},
        {name: "♨Apelido:", value: (!!userI.nickname ? userI.nickname : "Nenhum apelido!"), inline: true},
        {name: "🆔ID do membro:", value: user.id , inline: true},
        {name: "🗓️Conta criada:", value: created, inline: true},
        {name: "📅Entrou em:", value: joined, inline: true},
        {name: "<:sinaldestatusdabateriacommenosda:829100275285229598>Status:", value: status, inline: true},
        {name: "🌌Dispositivo:", value: String(device).replace("null", "Nenhum"), inline: true},
        {name: "🤖Bot?", value: user.user.bot ? "Sim" : "Não", inline: true}
    )
    .setColor("RAMDOM")
    .setTimestamp()
    .setThumbnail(message.guild.iconURL({dynamic: true}))
    .setFooter(`Pedido por: ${message.author.tag} || Id: ${message.author.id}`, message.author.displayAvatarURL({dynamic: true}))
    message.channel.send(embed)
   


}