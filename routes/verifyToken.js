const JWT = require('jsonwebtoken')

const verify = (req, res, next) => {
    
    const token = req.header('auth-token')
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verifyUser = JWT.verify(token, process.env.TOKEN_SECRET)
        req.user = verifyUser;
        next()
    }
    catch (err) {
        res.send(400).send("Invalid User")
        
    }

    
}

module.exports = verify