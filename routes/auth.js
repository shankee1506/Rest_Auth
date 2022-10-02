const express = require('express');
const router = express.Router();
const User = require('../model/User')
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation')
const JWT = require('jsonwebtoken')

router.get('/registerCheck', (req,res) => {
    res.send("Check the register page");
})

router.post('/register', async (req, res) =>  {
    
    //validate the user 
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)
        

    // if user email exist not save in database
    const existEmail = await User.findOne({ email: req.body.email })
    if (existEmail) return res.status(400).send('User already Exist');

    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    
    const user = new User({
        name: req.body.name, 
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const userRegister = await user.save();
        res.status(200).send({user:userRegister})
    } catch (error) {
        res.status(400).send({message:error})
    }


})



router.post('/login', async (req,res) => {
    
    //validate user
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    //user exist
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Invalid user')

    //checking the password
    const validatePassword = await bcrypt.compare(req.body.password, user.password)
    if (!validatePassword) return res.status(400).send("Invalid Password");


    //creating token for user
    const token = JWT.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token)
})

module.exports = router;