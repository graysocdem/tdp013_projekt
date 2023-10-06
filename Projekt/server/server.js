const bcrypt = require('bcryptjs')
const express = require('express') 
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/User')
const Page = require('./models/Page')
const Post = require('./models/Post')
// const { default: Post } = require('../frontend/src/Components/Post/Post')

const app = express(); 
const port = 3000;

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/facer')

//Get user
app.get('/user/:username', async (req, res) => {
  const { username } = req.params
  const query = User.find({ username: username})
  const result = await query
  //DEBUG
  console.log("Got user")
  res.status(200).send(JSON.stringify(result))
})

app.get('/users', async (req, res) => {
  const query = User.find()
  const result = await query

  console.log(result)
  res.status(200).send(JSON.stringify(result))
})

//Sign up
app.post('/user', async (req, res) => {
  const { username, password } = req.body
  const user = new User({
    username: username,
    password: password,
    friends: [],
    requests: []
  })

  const page = new Page({
    owner: username,
    post: []
  })

  try {
      await page.save()
      await user.save()
      console.log("Created user")
      res.status(200).send( {response: "User created"} );
  }   catch (err) {
      res.status(400).send( {response: err} )
  }
})

//Publish post
app.post('/post', async (req, res) => {

  const { owner, user, message, timestamp } = req.body

  const post = new Post({
    user: user,
    message: message,
    timestamp: timestamp
  })

  await Page.findOneAndUpdate(
    { owner: owner },
    { $push: { posts: post } }
  )
  
  post.save()

  console.log("Saved post")
  res.status(200).send()
})

//Get page
app.get('/page/:owner', async (req, res) => {
  const { owner } = req.params
  
  const query = Page.find({ owner: owner})
  const result = await query
  console.log("Sent page")
  res.status(200).send(JSON.stringify(result))
})

app.post("/:username/request", async (req, res) => {

  const { owner, suitor  } = req.body

  console.log(owner, suitor)
  await User.findOneAndUpdate(
    { username: owner },
    { $push: { requests: suitor } }
  )

  console.log("Saved request")
  res.status(200).send()

})

app.listen(port, () => console.log(`Listening on port ${port}`)); 