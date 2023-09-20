const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('User list')
})

router
    .route('/:id')
    .get((req, res) => {
        res.send(`Get user with ID ${req.params.id}`)
    })
    .put((req, res) => {
        res.send(`Update user with ID ${req.params.id}`)
    })
    .delete((req, res) => {
        res.send(`Delete user with ID ${req.params.id}`)
    })


router.get("/new", (req, res) => {
    res.send("User New Form")
})

router.post('/', (req, res) => {
    res.send('Create user')
})

router.get('/:id', (req, res) => {
    req.params.id
    res.send(`Get User With ID ${req.params.id}`)
})  //:id är dynamisk


//Matchar första från toppen
module.exports = router