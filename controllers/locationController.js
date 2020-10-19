'use strict'
const { Location, History } = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const db = require('../configFirebase/firebaseDB')
const LocationRef = db.ref('Location') 


class LocationController {
    static createLocation(req, res, next){
        // 01. create di postgres Location
        // 02. create di postgres History
        // 03. create di firebase DB

        let { name, area, city, waterLevel, latitude, longitude  } = req.body
        let id

        // 01. create di postgres Location
        Location.create({
            name, // Kebon Jeruk
            area, // West Jakarta
            city, // Jakarta
            waterLevel,
            latitude,
            longitude
        })
        .then(data => {
            id = data.id
            let payload = {
                LocationId : data.id,
                waterLevel : data.waterLevel,
                UserId : 1// default dulu sementara
            }
            // 02. create di postgres History
            return History.create(payload)
        })
        .then(data => {
            // 03. create di firebase DB
            return LocationRef.child(id).set({
                id: id,
                name: name,
                area: area,
                waterLevel: waterLevel,
                latitude: latitude,
                longitude: longitude,
                lastUpdate: `"${data.updatedAt}"`
            })
        })
        .then(data => {
            res.status(201).json({ msg: 'Success Create Location' })
        })
        .catch(err => {
            next(err)
        })
    }

    static getAllLocation(req, res, next){       

        
        // firebase.database().ref('location').orderByChild("name").equalTo(query).once("value", function(dataSnapshot){
        //     // console.log(snapshoot.val())
        //     setData(dataSnapshot.val())
        //     })
        // LocationRef.orderByChild('yourKey').startAt("Pa").endAt("\uf8ff").once("value", function(dataSnapshot){
        
        // select from Location where name = 'Bandung'
        // let query = 'Bandung' // set default
        // LocationRef.orderByChild("name").equalTo(query).once("value", function(dataSnapshot){
        //     console.log(dataSnapshot.val())
        // });


        LocationRef.orderByChild("name").once("value", function(dataSnapshot){
            console.log(dataSnapshot.val())
        });

        Location.findAll()
        .then(data => {
            res.status(200).json({ results: data })
        })
        .catch(err => {
            next(err)
        })
    }

    static search(req, res, next){
        let { query } = req.params
        console.log(query, 'dari search')

        Location.findAll({
            where: {
                city: {
                    [Op.iLike]: `%${query}%`
                  }
            }
        })
        .then(data => {
            res.status(200).json({ data })
        })
        .catch(err => {
            next(err)
        })
    }

    static searchInSearch(req, res, next){
        let { query } = req.params
        console.log(query, 'dari search')

        Location.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${query}%`
                  }
            }
        })
        .then(data => {
            res.status(200).json({ data })
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
        // 01. udpate di postgres Location
        // 02. create di postgres History
        // 03. update di firebase DB

        let { id } = req.params
        // console.log(req.body, "INI WATER LEVEL DRI CONTROLLER>>>>>>>>>>>>>>>>>>>>")
        if (req.body.waterLevel > 50) {
            let result
    
             // 01. udpate di postgres Location
            Location.findByPk(id)
            .then(data => {
                if(!data) throw { name: 'NOT_FOUND' }
                else {
                    return data.update({
                        ...data,
                        ...req.body,
                        danger: true
                    })
                }
            })
            .then(data => {
                result = data
                let payload = {
                    LocationId : data.id,
                    waterLevel : data.waterLevel,
                    image: req.body.image,
                    UserId : 1// default dulu sementara
                }
                // 02. create di postgres History
                return History.create(payload)
            })
            .then(data => {
                // 03. update di firebase DB
                return LocationRef.child(id).update({
                    lastUpdate:`"${data.updatedAt}"`,
                    ...req.body
                }
                    )
            })
            .then(data => {
                res.status(200).json({ result })
            })
            .catch(err => {
                next(err)
            })
        } else {
            res.status(200).json({ msg: `This water doesn't kill you :)`})
            let result
    
             // 01. udpate di postgres Location
            Location.findByPk(id)
            .then(data => {
                if(!data) throw { name: 'NOT_FOUND' }
                else {
                    return data.update({
                        ...data,
                        ...req.body,
                        danger: false
                    })
                }
            })
            .then(data => {
                res.status(200).json({ result })
            })
            .catch(err => {
                next(err)
            })
        }
    }

    static destroyLocation(req, res, next){        
        // 01. delete di postgres Location
        // 02. delete di firebase DB

        // admin.ref(`/users/${userid}`).remove()
        let { id } = req.params;

        // 01. delete di postgres Location
        Location.findByPk(id)
        .then(data => {
            if(!data) throw { name: 'NOT_FOUND' }
            else {
                data.destroy()
                 // 02. delete di firebase DB
                return db.ref(`Location/${id}`).remove()
            }
        })
        .then( data =>{
            res.status(200).json({ msg: 'Success Delete Location' })
        })
        .catch(err => {
            next(err)
        })
    }

    // static report(req, res, next) {
    //     const { id } = req.params;
    //     Location.findByPk(id)
    //     .then(data => {
    //         if (!data) throw { name: 'NOT FOUND' }
    //         Location.update({ danger: true }, {
    //             where: {
    //                 id
    //             }
    //         })
    //     })
    //     .then(data => {
    //         return Location.findByPk(id)
    //     })
    //     .then(data => {
    //         console.log(data, 'INI DATANYA')
    //         res.status(200).json(data)
    //     })
    //     .catch(err => {
    //         next(err);
    //     })
    // }
}

module.exports = LocationController