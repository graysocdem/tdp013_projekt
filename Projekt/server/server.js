const bcrypt = require('bcryptjs')
const express = require('express') 
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/User')
const Page = require('./models/Page')
const Post = require('./models/Post')

const app = express(); 
const port = 3000;

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/facer')

//Get user
app.get('/user/:username', async (req, res) => {
  const { username } = req.params
  const query = User.find({ username: username})
  const results = await query
  let result = [];
  if (results.length !== 0) { result = results[0] }
  
  //DEBUG
  res.status(200).send(JSON.stringify(result))
})

//Get page
app.get('/page/:owner', async (req, res) => {
  const { owner } = req.params
  const query = Page.find({ owner: owner})
  const results = await query
  results.length !== 0 ? res.status(200).send(JSON.stringify(results[0].posts)) : res.status(204).send()
})

app.get('/users', async (req, res) => {
  const query = User.find()
  const result = await query

  res.status(200).send(result)
})

//Sign up
app.post('/user', async (req, res) => {
  const { username, password } = req.body

  let conflictResult = await fetch(`http://localhost:${port}/user/${username}`, {
    headers: {
        'Content-Type': 'application/json'
    },
    method: "GET"
})
  conflictResult = await conflictResult.json() 
  if (conflictResult.length !== 0) {
    res.status(409).send( {response: "User already exists"} );
    return
  }

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
      res.status(500).send( {response: err} )
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

//send request
app.post("/:username/request", async (req, res) => {

  const { owner, suitor  } = req.body

  await User.findOneAndUpdate(
    { username: owner },
    { $push: { requests: suitor } }
  )

  console.log("Saved request")
  res.status(200).send()
})

//accept request
app.patch("/accept", async (req, res) => {
  const { owner, suitor } = req.body

  await User.findOneAndUpdate(
    { username: owner },
    { $push: { friends: suitor}}
  )

  await User.findOneAndUpdate(
    { username: owner },
    { $pull: { requests: suitor}}
  )

  await User.findOneAndUpdate(
    { username: suitor },
    { $push: { friends: owner} }
  )
  await User.findOneAndUpdate(
    { username: suitor },
    { $pull: { requests: owner}}
  )

  console.log("Updated")
  res.status(200).send()

})

app.listen(port, () => console.log(`Listening on port ${port}`)); 

module.exports = app