const config = require('../utils/config.js')

const auth = function (req, res, next) {
    const token = req.header('Authorization')

    if (!token || token != config.token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    next()
}

module.exports = auth