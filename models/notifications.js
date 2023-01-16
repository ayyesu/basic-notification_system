const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    recepient: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
    },
    message: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 2000,
    },
    uid: {
        type: String,
    },
}) 

const Notification = mongoose.model("Sent Notification", notificationSchema)

exports.Notification = Notification;