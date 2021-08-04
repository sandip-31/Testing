const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: String,
        default: false
    },

}, {
    timestamps: true,
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel