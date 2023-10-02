require('dotenv').config()


const express = require('express')
const app = express()
var cors = require('cors')
const mongoose = require('mongoose')

app.use(cors())

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection   
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const messageRouter = require('./routes/messages')
app.use('/messages', messageRouter )

app.listen(3000, () => console.log('Server Started'))

module.exports = app