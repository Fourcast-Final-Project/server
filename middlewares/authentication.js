const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

async function authentication (req, res, next) {
    const { access_token } = req.headers
    try {
        if (!access_token) throw {name: 'AUTHENTICATION_FAILED'}
        else {
            let decoded = verifyToken(access_token)
            let user = await User.findOne({
                where: {
                    id: decoded.id,
                    email: decoded.email
                }
            })
            if (!user) throw {name: 'AUTHENTICATION_FAILED'}
            else {
                console.log('sukses authentic')
                req.loggedInUser = {id: user.id, email: user.email}
                next()
            }
        }
    } catch (err) {
        next(err)
    }
}

module.exports = authentication