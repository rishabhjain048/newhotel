const mongoose = require("mongoose")

const guestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        // required: true  
    }
})



module.exports = mongoose.model("Guest", guestSchema)