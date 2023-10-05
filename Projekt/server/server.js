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
  res.status(200).send(JSON.stringify(result))
})

//Sign up
app.post('/user', async (req, res) => {
  const { username, password } = req.body
  const user = new User({
    username: username,
    password: password,
    friends: []
  })

  const page = new Page({
    owner: username,
    post: []
  })

  try {
      await page.save()
      await user.save()
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

  const query = Page.find({ owner: owner })
  const result = await query
  
  console.log(result)

  post.save()
  // console.log(post)
})

//Get page
app.get('/page/:owner', async (req, res) => {
  const { owner } = req.params
  
  const query = Page.find({ owner: owner})
  const result = await query

  console.log(result.posts)
})

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); 