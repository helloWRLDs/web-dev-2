require('dotenv').config()
const jwt = require('jsonwebtoken');

verifyToken = (req, res, next) => {
    const token = req.cookies.jwtToken
    const secretKey = process.env.JWT_SECRET
    if (!token) {
        return res.status(401).json({ error: 'Access denied' })
    }
    try {
        const decoded = jwt.verify(token, secretKey)
        req.userId = decoded.userId
        next()
    } catch (error) {
        res.status(401).json({error: 'Invalid token'})
    }
}


module.exports = {
    verifyToken
}