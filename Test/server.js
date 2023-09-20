const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // För att kunna parse:a JSON-data i request bodies

// MongoDB-anslutning
mongoose.connect('mongodb://localhost:27017/yourdatabase', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to MongoDB');
});

// Importera routes
const messagesRoute = require('./routes/messages');

// Använd routes
app.use('/messages', messagesRoute);

// Starta servern
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
