const mongoose = require("mongoose");

// var mongoURL = "mongodb+srv://sandip31:sandip123@booking.doqh0.mongodb.net/test"
// var mongoURL = "mongodb://localhost:27017/booking-Hotel"
var mongoURL = "mongodb+srv://s31:12345@hotelbooking.ve1sq.mongodb.net/MERN-H"

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })


var connection = mongoose.connection

connection.on('error', () => {
    console.log('Mongo DB Connected Failed')
})

connection.on('connected', () => {
    console.log('Mongo DB Connected Sucessful')
})

module.exports = mongoose;