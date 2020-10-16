'use strict'
const { Location } = require('../models')

class LocationController {
    static createLocation(req, res, next){
        let { name, waterlevel, latitude, longtitude  } = req.body
        Location.create({
            name,
            waterlevel,
            latitude,
            longtitude
        })
        .then(data => {
            res.status(201).json({ msg: 'Success Create Location' })
        })
        .catch(err => {
            next(err)
        })
    }

    static getAllLocation(req, res, next){
        Location.findAll()
        .then(data => {
            res.status(200).json({ result: data })
        })
        .catch(err => {
            next(err)
        })
    }

    static getByIdLocation(req, res, next){
        let { id } = req.params
        Location.findByPk(id)
        .then(data => {
            res.status(200).json({ result: data })
        })
        .catch(err => {
            next(err)
        })
    }

    static editLocation(req, res, next){
        let { id } = req.params
        Location.findByPk(id)
        .then(data => {
            if(!data) throw { name: 'NOT_FOUND' }
            else {
                return data.update({
                    ...data,
                    ...req.body
                })
            }
        })
        .then(data => {
            res.status(200).json({ data })
        })
        .catch(err => {
            next(err)
        })
    }

    static destroyLocation(req, res, next){
        let { id } = req.params;
        Location.findByPk(id)
        .then(data => {
            if(!data) throw { name: 'NOT_FOUND' }
            else {
                data.destroy()
                res.status(200).json({ msg: 'Success Delete Location' })
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = LocationController