const jwt = require('jsonwebtoken')
module.exports = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
            return res.status(403).json({message:'User is not authorized'})
        }
        const data = jwt.verify(token, process.env.JWT_SECRET)
        req.user = data
        next()

    } catch (e) {
        return res.status(403).json({message:'User is not authorized'})
    }
}