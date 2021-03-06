const { History } = require('../models')
const { Location } = require('../models')

class HistoryController {
    static create(req, res, next) {
        const { LocationId, waterLevel, image } = req.body
        console.log(LocationId, waterLevel. image)
        const UserId = req.loggedInUser.id
        History.create({
            LocationId, waterLevel, UserId, image
        })
        .then(data => {
            res.status(201).json({ msg: 'Success Create History' })
        })
        .catch(err => {
            next(err)
        })
    }

   
    static readAll(req, res, next) {
        const UserId = req.loggedInUser.id
        History.findAll({
            where: {
                UserId
            },
            include: [{
                model: Location
            }]
        })
        .then(data => {
            // if (!data) throw ({ name: 'INVALID_DATA' })
            res.status(200).json({ results: data })
        })
        .catch(err => {
            next(err)
        })
    }

    // static readOne(req, res, next) {
    //     const { id } = req.params
    //     const UserId = req.loggedInUser.id
    //     History.findOne({
    //         where: {
    //             id, UserId
    //         },
    //         include: [{
    //             model: Location
    //         }]
    //     })
    //     .then(data => {
    //         // if (!UserId) throw ({ name: 'INVALID_DATA' })
    //         console.log(data.length,`<<<<<<<< dari controlerr data.lenth`)
    //         if (data.length === 0) throw { name: 'NOT_FOUND'}
    //         res.status(200).json({ result: data })
    //     })
    //     .catch(err => {
    //         next(err)
    //     })
    // }

    static fetchByLocation(req, res, next) {
        const { id } = req.params
        History.findAll({
            where: {
                LocationId: id
            },
            include: [{
                model: Location
            }]
        })
        .then(data => {
            // if (!UserId) throw ({ name: 'INVALID_DATA' })
            if (!data) throw { name: 'NOT_FOUND' }
            res.status(200).json({ result: data })
        })
        .catch(err => {
            next(err)
        })
    }

    static fetchByLocation(req, res, next) {
        const { id } = req.params
        History.findAll({
            where: {
                LocationId: id
            },
            include: [{
                model: Location
            }]
        })
        .then(data => {
            // if (!UserId) throw ({ name: 'INVALID_DATA' })
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
        History.findOne({
            where: {
                id, UserId
            }
        })
        .then(data => {
            // if (!UserId) throw ({ name: 'INVALID_DATA' })
            if(!data) throw { name: 'NOT_FOUND' }
            else {
                data.destroy()
                res.status(200).json({ msg: 'success removing city from user history' })
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteAll(req, res, next) {
        const UserId = req.loggedInUser.id
        History.destroy({
            where: {
                UserId
            }
        })
        .then(data => {
            // if (!UserId) throw ({ name: 'INVALID_DATA' })
            res.status(200).json({ msg: 'success removing all cities from user history' })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = HistoryController