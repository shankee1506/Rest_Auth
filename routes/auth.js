const express = require('express');
const router = express.Router();
const User = require('../model/User')

router.get('/registerCheck', (req,res) => {
    res.send("Check the register page");
})

router.post('/register', async (req, res) =>  {
    
    const user = new User({
        name: req.body.name, 
        email: req.body.email,
        password: req.body.password
    });

    try {
        const userRegister = await user.save();
        res.json(userRegister)
    } catch (error) {
        res.json({message:error})
    }

    console.log(req.body)
})

module.exports = router;