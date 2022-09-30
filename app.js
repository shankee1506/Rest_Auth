const express = require('express');
const app = express();
const mongoose = require("mongoose");
require('dotenv/config');



app.get('/', (req, res) => {
    res.send("We catched the get method");
})


app.use(express.json());

//connect with router
const userRouter = require('./routes/auth');
app.use('/users', userRouter);


app.listen(8000, () => {
    console.log("App started initially");
})

mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('Database succefully connected')
});

