const discord = require ('discord.js') //coneção com a livraria discord.js
const client = new discord.Client() //criação de um novo cliente
const message = require ("./commands/client/events/message")
const user = require ("./commands/database/Schemas/User")
const db = require ("./commands/database/index")
const mongo = require ("mongoose")
const Guild = require("./commands/database/Schemas/Guild");
const db1 = require("quick.db")
const { Manager } = require("erela.js");
const parse = require ('./commands/convertMilliseconds')
const ar = require ("./commands/client/events/guildMemberAdd")
const by1 = require ("./commands/client/events/guildMemberRemove")




const config = require('./config.json');
client.config = config;

const { GiveawaysManager } = require('discord-giveaways');

client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});



const modules = ["music"]
const fs = require ("fs")
const dbindex = require ('./commands/database/index.js')
dbindex.start()



client.on("message", async message => {
  const server = await Guild.findOne({ id: message.guild.id })
  if(message.channel.type == "dm")return
  if(message.author.bot)return
  const embed = new discord.MessageEmbed()
.setTitle('**Arroze**')
.setDescription(`${message.author} O meu prefixo é **${server.prefix}**`)
.addField("Me ajuda a manter online:", `<:paypal:843166723342991370>[PAYPAL](https://paypal.me/DGomes431?locale.x=pt_PT)`)
.addField("Me adicone:", `<:invitation:856193400805523476>[Invite](https://discord.com/oauth2/authorize?client_id=827118058425417729&scope=bot&permissions=8)`)
.setFooter(`Pedido por: ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
.setTimestamp()
  if(message.content === '<@827118058425417729>' || message.content === `<@!827118058425417729>`){
    message.channel.send(embed)
  }
})



client.on ("message", async message => {
    if(message.author.bot) return;  //vai ignorar mensagens vindas de outros bots
    if(message.channel.type === "dm") return; //vai ingorar mensagens de bots no privado

    let databaseGuild = await Guild.findOne({ id: message.guild.id })
    
    if(!databaseGuild) databaseGuild = await new Guild({ id: message.guild.id }).save();

    if(!message.content.startsWith(databaseGuild.prefix)) return; //vai ignorar mensagens que não começem com o prefix do bot
    if(message.content.startsWith(`<@!${client.user.id}`) || message.content.startsWith(`<@${client.user.id}`)) return;//para o bot não entender a menção ou a sitação do seu id algo válido para executar comandos



    let args = message.content.split(" ").slice(1); //vai seprar os argumentos e mostrar para o bot como ele deve separar os comandos e vai ler o 1º argumento como se fosse o 1 comando
    let command = message.content.split(" ")[0];
    command = command.slice(config.prefix.length);

    try {
        let commandFile = require (`./commands/${command}.js`); //mostar para o bot como vai fazer a leitura dos proprios comandos
        delete require.cache [require.resolve(`./commands/${command}.js`)];
        return commandFile.run(client, message, args);
    } catch (err) { //caso deia algum erro aparecer na consola
        console.error("Erro" + err);
    }
})

client.on("guildMemberAdd", member => {
  ar.run(client, member)
})

client.on("guildMemberRemove", member => {
  by1.run(client, member)
})



client.on("guildCreate", async guild => {
  await Guild.create({ id: guild.id })
})

client.on("guildDelete", async guild => {
  await Guild.deleteOne({ id: guild.id })
})
client.on("raw", async d => {
  client.manager.updateVoiceState(d)
})




client.on("message", async message => {
  if(message.author.bot) return;
  if(!message.guild) return;
  let xpReward;
  if(client.user.id === "403192480444710914") xpReward = Math.floor(Math.random() * 0) + 0
  if(xpReward == 0) xpReward = 10
  let xp = db1.fetch(`xp.${message.author.id}`)
  let level = db1.fetch(`level.${message.author.id}`) || "0"
  let level2 = level + 1
  let levels = level2 * 1000

  if(!xp){
      db1.add(`xp.${message.author.id}`,xpReward)
  }else if(xp){
      db1.add(`xp.${message.author.id}`,xpReward)
  }

  if(xp > levels){
      db1.add(`level.${message.author.id}`,1)
  message.author.send(`<@${message.author.id}>, subiu pro nivel **${level2}**`)

  }
})

client.manager = new Manager({
  // Pass an array of node. Note: You do not need to pass any if you are using the default values (ones shown below).
  nodes: [
    // If you pass a object like so the "host" property is required
    {
      host: "127.0.0.1", // Optional if Lavalink is local
      port: 2333, // Optional if Lavalink is set to default
      password: "mutz12", // Optional if Lavalink is set to default
    },
  ],
  // A send method to send data to the Discord WebSocket using your library.
  // Getting the shard for the guild and sending thfuncionando nao da musica se lesse as doc iria saber o porque
  send(id, payload) {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  },
})

  .on("nodeConnect", node => console.log(`Node ${node.options.identifier} connected`))
  .on("nodeError", (node, error) => console.log(`Node ${node.options.identifier} had an error: ${error.message}`))
  .on("trackStart", (player, track) => {

      const embed = new discord.MessageEmbed()
      .setDescription(`**A tocar:** \n\`${track.title}\`\n\nDuração: ${parse(track.duration).hours}:${parse(track.duration).minutes}:${parse(track.duration).seconds}\nRequest by  ${track.requester}`)
      .setThumbnail(track.thumbnail);
      client.channels.cache
      .get(player.textChannel)

      client.channels.cache.get(player.textChannel).send(embed)
      
  })
  .on("queueEnd", (player) => {
    client.channels.cache
      .get(player.textChannel)
      .send(`A música acabou.`);

    player.destroy();

    
  });

// Ready event fires when the Discord.JS client is ready.
// Use EventEmitter#once() so it only fires once
client.on("error", e =>{
  console.log(e)
})

 
client.on("ready", () => {   //serve para mudar os status do bot
  console.log("Estou Online!")
  client.manager.init(client.user.id);
    let activities = [
        `https://paypal.me/DGomes431?locale.x=pt_PT`,
        `twitch.tv/arr0ze.`,
        `Gomezzz#9093 💵 = 🍦 `
    ],
i= 0
setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, {  //tempo do bot 5000 = 5 segundos
    type: "WATCHING", //WATCHING LISTENING PLAYING STREAMING
}), 5000)
client.user
.setStatus("dnd") //idle , dnd , online , invisible
.catch(console.log)
})
//mais compara la e olha oq u fez vc colocou pra se conectar dentro do ready no site tem nd disso



client.login(config.token);

