const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// 3.1 Implementera POST-anrop
router.post('/', async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 3.2 Implementera GET-anrop
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (message) {
            res.json(message);
        } else {
            res.status(404).json({ error: "Message not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3.3 Implementera PUT-anrop
router.put('/:id', async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (message) {
            message.read = req.body.read;
            await message.save();
            res.json(message);
        } else {
            res.status(404).json({ error: "Message not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
