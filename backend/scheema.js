const mongoose = require("mongoose") 

const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("Cards", cardSchema)