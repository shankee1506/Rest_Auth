const express = require('express');
const router = express.Router();
const User = require('../model/User')
const bcrypt = require('bcryptjs');
const { registerValidation } =require('../validation')

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
        res.status(200).send(userRegister)
    } catch (error) {
        res.status(400).send({message:error})
    }


})

module.exports = router;