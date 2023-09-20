const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        default: "Jon Do"
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Post', postSchema)