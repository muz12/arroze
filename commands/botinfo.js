const Discord = require ("discord.js")
const os = require ("os")
const cpuStat = require("cpu-stat");
const moment = require ("moment")


module.exports.run = async (client, message, args) => {

    let { version } = require ("discord.js");

    cpuStat.usagePercent(function (err, percent, seconds) {
        if (err) {
            return console.log(err);
        }

        
        
     
        let embed = new Discord.MessageEmbed()
        .setColor("RAMDOM")
        .setTitle("__**Informações do bot**__")
        .addField("<:pen:829093580719128648>Creador do bot:", "Gomezzz#9093")
        .addField("<:ram:829092926868291594>Ram utilizada ", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,true)
        .addField("<:ferramentadehoradorelogio:829094344392310834>Online desde ", (Math.round(client.uptime / (1000 * 60 * 60 * 24)) % 30) + " dias, " + (Math.round(client.uptime / (1000 * 60 * 60))) + " h, " + (Math.round(client.uptime / (1000 * 60)) % 60) + " min,  " + (Math.round(client.uptime / 1000) % 60) + "sec", true)
        .addField("<:membro:829094904868372490>Membros: ", `${client.users.cache.size.toLocaleString()}`, true)
        .addField("<:verificacaodoservidor:829095347589611601>Servidores: ", `${client.guilds.cache.size.toLocaleString()}`, true)
        .addField("<:logosquare:829096767517753394>Discord.js ", `v${version}`, true)
        .addField("<:download:829096954930659368>Node ", `${process.version}`, true)
        .addField("<:cpu:829097225652142090>CPU ", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
        .addField("<:2493301:829097408985038849>Utilização do CPU ", `\`${percent.toFixed(2)}%\``, true)
        .addField("<:cpu1:829097666704441364>Bits", `\`${os.arch()}\``, true)
        .addField("<:plataformadepetroleo:829098756271505438>Plataforma", `\`\`${os.platform()}\`\``, true)
        .addField("<:javascript1:829072392688238592> Linguagem do bot :", "Javascript")
        .addField("Meu servidor:", `[Meu convite](https://discord.gg/f3qBM7d)`, true)
        .setFooter(`Pedido por: ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))

            message.channel.send(embed)
    }) 
    
    

}