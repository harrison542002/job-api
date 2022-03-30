const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const authentication = async (req, res, next) => {
    const auth = req.headers.authorization
    if (!auth || !auth.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication Fail')
    }
    const token = auth.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const { userID, username } = payload
        req.user = { userID, name:username }
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication Fail')
    }
}

module.exports = authentication