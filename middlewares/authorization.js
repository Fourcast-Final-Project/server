const { History } = require('../models')
const { Subscribe } = require('../models')

async function historyAuthorization (req, res, next) {
    const id = Number(req.params.id)
    const UserId = req.loggedInUser.id
    try {
        let history = await History.findOne({
            where: {
                id
            }
        })
        if (!history) throw {name: 'NOT_FOUND'}
        else {
            if (UserId == history.UserId) {
                next()
            } else throw {name: 'NOT_AUTHORIZED'}
        }    
    }
    catch (err) {
        next(err)
    }
}

async function subscribeAuthorization (req, res, next) {
    const id = Number(req.params.id)
    const UserId = req.loggedInUser.id
    try {
        let subscribe = await Subscribe.findOne({
            where: {
                id
            }
        })
        if (!subscribe) throw {name: 'NOT_AUTHORIZED'}
        else {
            if (UserId == subscribe.UserId) {
                next()
            } else throw {name: 'NOT_AUTHORIZED'}
        }    
    }
    catch (err) {
        next(err)
    }
}

module.exports = { historyAuthorization, subscribeAuthorization }