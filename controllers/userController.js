'use strict'

const { User } = require('../models')
const { comparePass } = require('../helpers/bcrypt')

class UserController {
    static register(req, res, next){
        let { email, password } = req.body
        // console.log(email, password, 'masuk user email ')
        User.create({
            email, 
            password
        })
        .then(data => {
            res.status(201).json({ msg: 'Success Create User' })
        })
        .catch(err => {
            next(err)
        })
    }

    static login(req, res, next){
        // console.log('masuk login')
        User.findOne({
            where: { email: req.body.email }
        })
        .then(data => {
            console.log(data, '<<<<<<<<<<<< data dari login')
            if(!data) throw { name: 'INVALID_EMAIL_OR_PASS' }
            let compare = comparePass(req.body.password, data.password)
            if(!compare) throw { name: 'INVALID_EMAIL_OR_PASS' }

            res.status(200).json({ email: data.email })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController