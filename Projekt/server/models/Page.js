const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    posts: [{
        user: String,
        required: true,

        text: String,
        required: true,

        timestamp: String,
        required: true

    }]
})

module.exports = mongoose.model('Page', pageSchema)

/* 

["pages"]

{
    user: username,
    posts [
        {
            poster: username,
            text: text,
            timestamp: timestamp
        }
    ]
} 

*/