const express = require('express')
const router = express.Router()
const Post = require('../models/post')

var sanitize = require('mongo-sanitize')

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
        idGet(req, res)
    }
    //Uppdatera en via PATCH
    else if (req.method === "PATCH") {
        idPatch(req, res)
    }
    else {
        res.status(405).send("Method Not Allowed")
    }
})

// router.all('*', (req, res) => {
//     console.log("hejhej jag finns")
//     if (err instanceof NotFound) {
//         res.status(404).send("Not Found")
//     }
//     else {
//         res.status(500).send("Unknown Error")
//     }
// })

async function messagesPost(req, res) {
    const post = new Post({
        author: sanitize(req.body.author),
        message: sanitize(req.body.message),
        timestamp: sanitize(req.body.timestamp),
        read: sanitize(req.body.read)
    })
    try {
        await post.save()
        res.status(200).send("Post created");
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
    }
}


async function idPatch(req, res) {
    cleanID = sanitize(req.params.id)
    console.log(req.params.id)
    if (invalidId(cleanID)) {
        res.status(400).send("Invalid parameter")
        return
    }

    const post = await Post.findById(cleanID)
    if (post.read) {
        post.read = false
        res.json("Post marked as unread.")
    }
    else {
        post.read = true
        res.json("Post marked as read.")
    }

    try {
        await post.save()
        res.status(200)
    } catch (err) {
        res.status(500)
    }
}

async function idGet(req, res) {
    cleanID = sanitize(req.params.id)

    try {
        const post = await Post.findById(cleanID)
        res.status(200)
        res.json(post)
        
    } catch (err) {
        res.status(400).send("Error occurred");
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
    if ((48 <= c && c <= 57) || (97 <= c && c <= 122)) { return false }
    return true
}

module.exports = router
