const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

app.listen(3000, () => {
    console.log("App started initially");
})

app.get('/', (req, res) => {
    res.send("We catched the get method");
})


mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('Database succefully connected')
});