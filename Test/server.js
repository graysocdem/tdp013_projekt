const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // För att kunna parse:a JSON-data i request bodies

// Importera routes
const messagesRoute = require('./routes/messages');

// Använd routes
app.use('/messages', messagesRoute);

console.log("asdfasdf")

// Starta servern
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});