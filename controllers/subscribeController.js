'use strict'
const { Subscribe } = require('../models')
const { Location } = require('../models')

class SubscribeController {
    static create(req, res, next) {
        const { LocationId } = req.body
        console.log("masuk subss", LocationId)
        const UserId = req.loggedInUser.id
        // Subscribe.create({
        //     UserId: idUser, 
        //     LocationId: idLocation
        Subscribe.findOrCreate({
            where: {
                UserId, 
                LocationId
            }
        })
        .then(data => {
             //console.log (data[1])
            if(data[1] === false){
                // res.status(200).json({ msg: 'you already subscribe for this location before' })
                throw ({name: 'ALREADY_SUBCRIBE'})
            } else {
                res.status(201).json({ msg: 'subscribe location succeed' })
            }
            
        })
        .catch(err => {
            next(err)
        })
    }

    static readAll(req, res, next) {
        const UserId = req.loggedInUser.id
        Subscribe.findAll({
            where: {
                UserId
            },
            include: [{
                model: Location
            }]
        })
        .then(data => {
            if (data.length === 0) throw ({ name: 'NOT_FOUND' })
            res.status(200).json({ results: data })
        })
        .catch(err => {
            next(err)
        })
    }

    static readOne(req, res, next) {
        const { id } = req.params
        const UserId = req.loggedInUser.id
        Subscribe.findOne({
            where: {
                id, UserId
            }
        })
        .then(data => {
            if (!data) throw { name: 'NOT_FOUND' }
            res.status(200).json({ result: data })
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteOne(req, res, next) {
        const { id } = req.params
        const UserId = req.loggedInUser.id
        Subscribe.findOne({
            where: {
                id, UserId
            }
        })
        .then(data => {
            if (!UserId) throw ({ name: 'INVALID_DATA' })
            if(!data) throw { name: 'NOT_FOUND' }
            else {
                data.destroy()
                res.status(200).json({ msg: 'success removing city from your subscribed list' })
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteAll(req, res, next) {
        const UserId = req.loggedInUser.id
        Subscribe.destroy({
            where: {
                UserId
            }
        })
        .then(data => {
            res.status(200).json({ msg: 'success removing all cities from user subscribed list' })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = SubscribeController