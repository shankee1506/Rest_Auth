const express = require('express');
const router = express.Router();
const verify = require('../routes/verifyToken')

router.get('/posts', verify, (req,res) => {
res.send('Get the user verified')
})

module.exports = router;