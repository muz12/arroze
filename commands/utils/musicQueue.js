// Guarda a fila de música de cada servidor (guild) em memória.
// queues: Map<guildId, queueObject>
//
// queueObject = {
//   voiceChannel,   // canal de voz onde o bot está
//   connection,     // VoiceConnection do discord.js
//   dispatcher,     // StreamDispatcher da música atual
//   textChannel,    // canal de texto para enviar mensagens "a tocar agora"
//   songs: [],      // array de { title, url, requestedBy }
//   volume: 100,    // volume de 0 a 100
//   loop: false     // repetir a música atual?
// }

const queues = new Map();

module.exports = {
    queues,
    getQueue(guildId) {
        return queues.get(guildId);
    },
    setQueue(guildId, queue) {
        queues.set(guildId, queue);
        return queue;
    },
    deleteQueue(guildId) {
        queues.delete(guildId);
    }
};
