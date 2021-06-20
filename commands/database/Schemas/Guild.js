const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
    id: { type: String, required: true },
    prefix: { type: String, default: "?" },
    welcome: {
        status: { type: Boolean, default: false },
        channel: { type: String, default: "null" },
        msg: { type: String, default: "null" },
      },
      byebye: {
        status: { type: Boolean, default: false },
        channel: { type: String, default: "null" },
        msg: { type: String, default: "null" },
      },
    
});

const Guild = mongoose.model("guilds", guildSchema );
module.exports = Guild

