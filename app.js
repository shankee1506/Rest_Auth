const express = require('express');
const app = express();
const mongoose = require("mongoose");
require('dotenv/config');
// mongoose.set("useNewUrlParser", true);
// mongoose.set("useUnifiedTopology", true);
// mongoose.set("useFindAndModify", false);


app.get('/', (req, res) => {
    res.send("We catched the get method");
})


app.use(express.json());

//connect with router
const userRouter = require('./routes/auth');
const User = require('./model/User');
app.use('/users', userRouter);


app.listen(8000, () => {
    console.log("App started initially");
})

mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('Database succefully connected')
});

// mongoose.connect(process.env.DB_CONNECTION, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,

//   });

//   const connection = mongoose.connection;
//   connection.once("open", () => {
//     console.log("Mongodb connetction succesfull");
//   });
  
// new User({
//     name: 'shankee'
// }).save(() => {
//     console.log('created User')
// })