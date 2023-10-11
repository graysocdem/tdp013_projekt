const express = require('express')
const router = express.Router()
const Post = require('../models/post')

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
        fetchPostById(req, res)
    }
    //Uppdatera en via PATCH
    else if (req.method === "PATCH") {
        patchPostById(req, res)
    }
    else {
        res.status(405).send("Method Not Allowed")
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
        res.status(200).send("Post created");
    } catch (err) {
        res.status(400).send("Bad Request (Illegal Parameter?)")
    }
}

async function messagesGet(req, res) {

    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        res.status(500).send("Internal Server Error")
    }
}

async function fetchPostById(req, res) {
    if (invalidId(req.params.id)) {
        res.status(400).send("Invalid Parameter")
        return
    }

    try {
        const post = await Post.findById(req.params.id)
        res.status(200)
        res.json(post)
        
    } catch (err) {
        res.status(500).send("Internal Server Error")
    }
}

async function patchPostById(req, res) {
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

//mongoDB-id är 24 karaktärer långt och är endast ASCII
function invalidId(str) {
    console.log("nu testar jag!")
    if (str.length != 24) { console.log("string invalid length"); return true }
    for (i = 0; i < str.length; i++) {
        if (invalidChar(str.charCodeAt(i))) { console.log("invalid character"); return true }
    }
    console.log("string validated")
    return false
}

function invalidChar(c) {
    console.log(c)
    if ((48 <= c && c <= 57) || (97 <= c && c <= 122)) { return false }
    return true
}

module.exports = router
