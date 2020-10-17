'use strict'
const { Location } = require('../models')

const db = require('../configFirebase/firebaseDB')
const LocationRef = db.ref('location') 


class LocationController {
    static createLocation(req, res, next){
        let { name, waterLevel, latitude, longitude  } = req.body

        console.log(name, waterLevel, latitude, longitude)
        
        Location.create({
            name,
            waterLevel,
            latitude,
            longitude
        })
        .then(data => {
            res.status(201).json({ msg: 'Success Create Location' })
        })
        .catch(err => {
            next(err)
        })
    }

    static getAllLocation(req, res, next){
        

        // let query = 'Palembang' // set default
        // firebase.database().ref('location').orderByChild("name").equalTo(query).once("value", function(dataSnapshot){
        //     // console.log(snapshoot.val())
        //     setData(dataSnapshot.val())
        //     })

        // LocationRef.orderByChild('yourKey').startAt("Pa").endAt("\uf8ff").once("value", function(dataSnapshot){
        //  LocationRef.orderByChild("name").equalTo(query).once("value", function(dataSnapshot){
        //     console.log(dataSnapshot.val())
        // });


        Location.findAll()
        .then(data => {
            res.status(200).json({ results: data })
        })
        .catch(err => {
            next(err)
        })
    }

    static getByIdLocation(req, res, next){
        let { id } = req.params
        Location.findByPk(id)
        .then(data => {
            if (!data) throw { name: 'NOT_FOUND' }
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