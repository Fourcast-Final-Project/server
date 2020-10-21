'use strict'
const { Location, History, Subscribe, User } = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const axios = require('axios')

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
                UserId : req.loggedInUser.id// default dulu sementara
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

    static findAllByCity(req, res, next) {
        let { city } = req.params
        Location.findAll({
            where: {
                city
            }
        })
        .then(data => {
            res.status(200).json({ data })
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

    static searchInSearch(req, res, next){
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
        console.log(id, 'INI DRI EDIT LOC!!!!!!!!!')
        console.log(req.body, "INI WATER LEVEL DRI CONTROLLER>>>>>>>>>>>>>>>>>>>>")
        if (req.body.waterLevel > 50) {
            let result
    
             // 01. udpate di postgres Location
            Location.findByPk(id)
            .then(data => {
                console.log(1)
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
                console.log(2)
                result = data
                let payload = {
                    LocationId : data.id,
                    waterLevel : data.waterLevel,
                    image: req.body.image,
                    UserId : req.loggedInUser.id //req.loggedInUser.id// default dulu sementara
//                     UserId : 4 //req.loggedInUser.id// default dulu sementara
                }
                // 02. create di postgres History
                return History.create(payload)
            })
            .then(data => {
                console.log(3)
                // 03. update di firebase DB
                return LocationRef.child(id).update({
                    lastUpdate:`"${data.updatedAt}"`,
                    ...req.body
                }
                    )
            })
            .then(data => {

               return Subscribe.findAll({
                   where: { LocationId: result.id },
                   include: [ User ]
               })
                
            })
            .then(data => {
                
                 Promise.all(data.map(item => {
                    axios({
                      method: 'post',
                      url: `https://exp.host/--/api/v2/push/send`,
                      headers: {
                        accept: 'application/json',
                        'content-type': 'application/json'
                    },
                      data: JSON.stringify(
                            {
                             to: item.User.expoToken,
                             sound: "default",
                             body: `Hi Team FOURCAST ${item.User.email}!, DANGER ALERT FOR ${result.name}`
                           }
                           
                         )
                    });
                  }));
            })
            .then(data => {
                res.status(200).json({ result })
            })
            .catch(err => {
                next(err)
            })
        } else {
            // res.status(200).json({ msg: `This water doesn't kill you :)`})
            let result
    
             // 01. udpate di postgres Location
             console.log(5)
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
             console.log(6)
                // 03. update di firebase DB
                return LocationRef.child(id).update({
                    lastUpdate:`"${data.updatedAt}"`,
                    ...req.body
                })
            })
            .then(data => {
                res.status(200).json({ msg:"Success Update Location" })
            })
            .catch(err => {
                next(err)
            })
        }
    }

    // static destroyLocation(req, res, next){        
    //     // 01. delete di postgres Location
    //     // 02. delete di firebase DB

    //     // admin.ref(`/users/${userid}`).remove()
    //     let { id } = req.params;

    //     // 01. delete di postgres Location
    //     Location.findByPk(id)
    //     .then(data => {
    //         if(!data) throw { name: 'NOT_FOUND' }
    //         else {
    //             data.destroy()
    //              // 02. delete di firebase DB
    //             return db.ref(`Location/${id}`).remove()
    //         }
    //     })
    //     .then( data =>{
    //         res.status(200).json({ msg: 'Success Delete Location' })
    //     })
    //     .catch(err => {
    //         next(err)
    //     })
    // }
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