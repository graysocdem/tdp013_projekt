const bcrypt = require('bcryptjs')
const express = require('express') 
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
  res.status(200).send(JSON.stringify(result))
})

app.post('/user', async (req, res) => {
  const { username, password } = req.body
  // const pepper = "C7IsTheWOAT"
  // const pepperedPassword = bcrypt.hashSync(password, 10)
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

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body
//   const pepper = "C7IsTheWOAT"
//   let pepperedPassword = bcrypt.hashSync(password + pepper, 10)
//   console.log("Searching for", username, pepperedPassword)
//   const query = User.find({ username: username })
//   const result = await query

//   console.log("kolla hit", result[0].password)
//   bcrypt.compare(pepperedPassword, result[0].password, (err, result) => {
//     console.log(err, result)
//     if (err) {
//       console.log("oops")
//     }
//     if (result) {
//       console.log('win')
//     }
//     else {
//       console.log("fail")
//     }
//   })
//   //DEBUG
//   console.log(`Found match: ${result}`)

//   res.status(200).send(JSON.stringify(result))
// })

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); 