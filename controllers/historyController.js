const { History } = require('../models')

class HistoryController {
    static create(req, res, next) {
        const { location, time, waterLevel, UserId } = req.body
        History.create({
            location, time, waterLevel, UserId
        })
        .then(data => {
            res.status(201).json({ msg: 'Success Create History' })
        })
        .catch(err => {
            next(err)
        })
    }

    static readAll(req, res, next) {
        const { UserId } = req.body
        History.findAll({
            where: {
                UserId
            }
        })
        .then(data => {
            if (!UserId) throw ({ name: 'INVALID_DATA' })
            res.status(200).json({ results: data })
        })
        .catch(err => {
            next(err)
        })
    }

    static readOne(req, res, next) {
        const { id } = req.params
        const { UserId } = req.body
        History.findOne({
            where: {
                id, UserId
            }
        })
        .then(data => {
            if (!UserId) throw ({ name: 'INVALID_DATA' })
            if (!data) throw { name: 'NOT_FOUND' }
            res.status(200).json({ result: data })
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteOne(req, res, next) {
        const { id } = req.params
        const { UserId } = req.body
        History.findOne({
            where: {
                id, UserId
            }
        })
        .then(data => {
            if (!UserId) throw ({ name: 'INVALID_DATA' })
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
        const { UserId } = req.body
        History.destroy({
            where: {
                UserId
            }
        })
        .then(data => {
            if (!UserId) throw ({ name: 'INVALID_DATA' })
            res.status(200).json({ msg: 'success removing all cities from user history' })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = HistoryController