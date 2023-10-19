const bcrypt = require('bcryptjs')
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const auth = require('./auth')
const cors = require('cors')

const https = require('https')
const http = require('http')
const fs = require('fs')

const User = require('./models/User')
const Page = require('./models/Page')
const Post = require('./models/Post')

const httpApp = express()
const httpsApp = express()
const port = 3000;

require('dotenv').config()

const httpsCorsOptions = {
  origin: "*"
}

httpApp.use(cors())
httpApp.use(express.json())
httpsApp.use(cors(httpsCorsOptions))
httpsApp.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/facer')

//Get user
httpApp.get('/user/:username', auth, async (req, res) => {
  const { username } = req.params
  const query = User.find({ username: username })
  const results = await query
  let result = [];
  if (results.length !== 0) { result = results[0] }

  res.status(200).send(JSON.stringify(result))
})

//Get page
httpApp.get('/page/:user', auth, async (req, res) => {

  if (res.status === 401) { return }

  const { user } = req.params
  const query = Page.find({ owner: user })
  const results = await query
  results.length !== 0 ? res.status(200).send(JSON.stringify(results[0].posts)) : res.status(204).send()
})

//Get all users
httpApp.get('/users', auth, async (req, res) => {
  const query = User.find()
  const result = await query

  res.status(200).send(result)
})

//Sign up
httpApp.post('/user', async (req, res) => {
  const { username, password } = req.body

  const query = User.find({ username: username })
  const results = await query
  let conflictResult = [];
  if (results.length !== 0) { conflictResult = results[0] }

  if (conflictResult.length !== 0) {
    res.status(409).send({ response: "User already exists" });
    return
  }

  const user = new User({
    username: username,
    password: password,
    friends: [],
    requests: [],
    token: jwt.sign(
      { username: username },
      process.env.SERVER_SECRET,
      {
        expiresIn: 169766142000
      }
    )
  })

  const page = new Page({
    owner: username,
    posts: []
  })

  await user.save()
  // console.log("hej")
  await page.save()
  // console.log("Created user")
  res.status(201).send({ response: "User created" });
  // res.status(400).send( {response: err} )

})

//Login
httpsApp.post('/login', async (req, res) => {
  const { username, password } = req.body

  const query = User.find({ username: username })
  const results = await query
  let user = [];
  if (results.length !== 0) { user = results[0] }

  if (username == user.username) {
    console.log(password, user.password)
    bcrypt.compare(password, user.password, (err, result) => {

      if (err) {
        console.log("oops!", err)
      }

      if (result) {
        console.log("success!")
        token = jwt.sign(
          { username: username },
          process.env.TOKEN_KEY,
          {
            expiresIn: "1h"
          }
        )
        res.status(200).send( { username: username, token: token } )
        return
      }
      else {
        res.status(401).send()
        return
      }
    })
  }

})

//Publish post
httpApp.post('/post', auth, async (req, res) => {

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
httpApp.post("/:username/request", auth, async (req, res) => {

  const { owner, suitor } = req.body

  await User.findOneAndUpdate(
    { username: owner },
    { $push: { requests: suitor } }
  )

  console.log("Saved request")
  res.status(200).send()
})

//accept request
httpApp.patch("/accept", auth, async (req, res) => {
  const { owner, suitor } = req.body

  console.log(owner, suitor)
  await User.findOneAndUpdate(
    { username: owner },
    { $push: { friends: suitor } }
  )

  await User.findOneAndUpdate(
    { username: owner },
    { $pull: { requests: suitor } }
  )

  await User.findOneAndUpdate(
    { username: suitor },
    { $push: { friends: owner } }
  )
  await User.findOneAndUpdate(
    { username: suitor },
    { $pull: { requests: owner } }
  )

  console.log("Updated")
  res.status(200).send()

})

const httpsOptions = {
  key: fs.readFileSync("./certs/server.key"),
  cert: fs.readFileSync("./certs/server.cert"),
};

https.createServer(httpsOptions, httpsApp).listen(3443, (req, res) => { console.log("HTTPS server started at port 3443") })
http.createServer(httpApp).listen(3000, (req, res) => { console.log("HTTP server started at port 3000") })
// httpApp.listen(port, () => console.log(`Listening on port ${port}`)); 

module.exports = {
  httpApp: httpApp,
  httpsApp: httpsApp
}