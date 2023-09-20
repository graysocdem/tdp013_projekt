const express = require('express')
const router = express.Router()
const Post = require('../models/post')

//Helmet mot mongodb-injections??

router.all('/', async (req, res) => {

    //Hämta alla med GET
    if (req.method === "GET") {
        messagesGet(req, res)
    }
    //Lägg upp ett inlägg med POST
    else if (req.method === "POST") {
        messagesPost(req, res)
    }
    else {
        res.status(405).send("Method Not Allowed")
    }
})

router.all('/:id', async (req, res) => {

    //Hämta en med GET
    if (req.method === "GET") {
        idGet(req, res) //är req & res en pekare?
    }
    //Uppdatera en via PATCH
    else if (req.method === "PATCH") {
        idPatch(req, res)
    }
    else {
        res.status(405).send("Method Not Allowed")
    }
})

router.all('*', (req, res) => {
    if (err instanceof NotFound) {
        res.status(404).send("Not Found")
    }
    else {
        res.status(500).send("Unknown Error")
    }
})

async function messagesPost(req, res) {
    const post = new Post({
        author: req.body.author,
        message: req.body.message,
        timestamp: req.body.timestamp,
        read: req.body.read
    })
    try {
        await post.save()
        res.status(200)
        res.send("Post created")
    } catch (err) {
        res.status(400).send("Illegal parameter")
    }
}

async function messagesGet(req, res) {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {

        res.status(500).send("Method Not Allowed")

        res.json({ message: err.message })
    }
}


async function idPatch(req, res) {
    console.log(req.params.id)
    if (invalidId(req.params.id)) {
        res.status(400).send("Invalid Parameter")
        return
    }

    const post = await Post.findById(req.params.id)
    if (post.read) {
        post.read = false
        res.json("post marked as unread")
    }
    else {
        post.read = true
        res.json("post marked as read")
    }

    try {
        await post.save()
        res.status(200)
    } catch (err) {
        res.status(500)
    }
}

async function idGet(req, res) {
    try {
        const post = await Post.findById(req.params.id)
        res.json(post)
        res.status(200)
    } catch (err) {
        res.status(400)
    }
}

function invalidId(str) {
    if (str.length != 24) { console.log("string invalid length"); return true }
    for (i = 0; i < str.length; i++) {
        if (invalidChar(str.charCodeAt(i))) { console.log("invalid character"); return true }
    }
    console.log("string validated")
    return false
}

function invalidChar(c) {
    if (48 <= c && c <= 57 || 97 <= c && c <= 122) { return false }
    return true
}

module.exports = router
