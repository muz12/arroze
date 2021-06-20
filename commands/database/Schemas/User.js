const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    id: { type: String, require: true },
})

const User = mongoose.model("users", userSchema)
module.exports = User;