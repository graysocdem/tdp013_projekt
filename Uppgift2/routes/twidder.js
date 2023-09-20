const express = require('express')
const router = express.Router()
const Post = require('../models/post')

router.get('/getposts', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        res.status(500).json({ message: err.message })
    } 
})

router.get('/:id', (req, res) => {
    res.send(req.params.id)
})

router.post('/', async (req, res) => {
    const post = new Post({
        author: req.body.author,
        message: req.body.message,
        timestamp: req.body.timestamp,
        read: req.body.read
    })
    try {
        await post.save()
        res.status(201).json({ message: "post created"})
    } catch (err) {
        res.status(400).json({ message: err.message})

    }
})

module.exports = router