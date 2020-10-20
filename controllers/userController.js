'use strict'
const Redis = require("ioredis");
const redis = new Redis();
const { User } = require('../models')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken, verifyToken } = require('../helpers/jwt')


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
        console.log('masuk login')
        // redis.get('user')
        // .then(data => {
        //     if (data) {
        //         res.status(200).json(data)
        //         console.log(JSON.parse(JSON.stringify(data)), 'INI DATA LOGIN');
        //         return data
        //     } else {
                User.findOne({
                    where: { email: req.body.email }
                })
            // }
        // })
        .then(data => {
            // console.log(data, '<<<<<<<<<<<< data dari login')
            if(!data) throw { name: 'INVALID_EMAIL_OR_PASS' }
            let compare = comparePass(req.body.password, data.password)
            if(!compare) throw { name: 'INVALID_EMAIL_OR_PASS' }
            let payload = {id: data.id, email: data.email}
            let access_token = generateToken(payload)
            redis.set('user', JSON.stringify({ data }));
            res.status(200).json({
                msg: 'login success',
                id: data.id,
                email: data.email,
                access_token: access_token
            })
        })
        .catch(err => {
            next(err)
        })
    }

    // static logout(req, res, next) {
    //     redis.get('user')
    //     .then(data => {
    //         if (!data) throw { name: 'NOT LOGGED IN' };
    //         return redis.del('user');
    //     })
    //     .then(_ => {
    //         res.status(200).json({ msg: 'User logged out successfully' });
    //     })
    //     .catch(err => {
    //         next(err);
    //     })
    // }
}

module.exports = UserController