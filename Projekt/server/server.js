const express = require('express'); 
const mongoose = require('mongoose')
const cors = require('cors')

const app = express(); 
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

mongoose.connect('127.0.0.1:27017/facer')

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); 

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
}); 
