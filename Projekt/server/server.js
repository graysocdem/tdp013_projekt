const express = require('express'); 
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/User')

const app = express(); 
const port = 3000;

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/facer')

app.get('/user/:username', async (req, res) => {
  const { username } = req.params
  const query = User.find({ username: username})
  const result = await query
  //DEBUG
  console.log(`user: ${result}`)

  res.status(200).send(JSON.stringify(result))
})

app.post('/user', async (req, res) => {
  const { username, password } = req.body
  const user = new User({
    username: username,
    password: password,
    friends: []
  })

  try {
      await user.save()
      res.status(200).send( {response: "User created"} );
  }   catch (err) {
      res.status(400).send( {response: err} )
  }
})


// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); 