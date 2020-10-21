const request = require('supertest')
const app = require('../app')
const { Location } = require('../models')

const location_data = {
    name: 'depok',
    waterLevel: 3.3,
    latitude: -6.385589,
    longitude: 106.830711,
    city: 'west jakarta',
    area: 'jakarta',
    danger: false
}

describe('create location/success case', () => {
    test ('success adding city to database', (done) => {
        request (app)
            .post('/locations')
            .send(location_data)
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(201)
               expect(res.body).toHaveProperty('msg', "Success Create Location")
               done()
            })
    })
})

describe('create location/error case', () => {
    test ('invalid name', (done) => {
        request (app)
            .post('/locations')
            .send({
                name: '',
                waterLevel: 3.3,
                latitude: -6.385589,
                longitude: 106.830711,
                city: 'west jakarta',
                area: 'jakarta',
                danger: false
            })
            .end( function(err, res) {
                const errors = ["must enter location's name"]
                if (err) throw err
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
            })
    })

    test ('invalid latitude', (done) => {
        request (app)
            .post('/locations')
            .send({
                name: 'depok',
                waterLevel: 33,
                latitude: -93,
                longitude: 106.830711,
                city: 'west jakarta',
                area: 'jakarta',
                danger: false
            })
            .end( function(err, res) {
                const errors = ['latitude range must be between -90 up to +90 degrees']
               if (err) throw err
               expect(res.status).toBe(400)
               expect(res.body).toHaveProperty('errors', expect.any(Array))
               expect(res.body.errors).toEqual(expect.arrayContaining(errors))
               done()
            })
    })

    test ('invalid longitude', (done) => {
        request (app)
            .post('/locations')
            .send({
                name: 'depok',
                waterLevel: 33,
                latitude: -6.385589,
                longitude: 186.830711,
                city: 'west jakarta',
                area: 'jakarta',
                danger: false
            })
            .end( function(err, res) {
                const errors = ['longitude range must be between -180 up to +180 degrees']
               if (err) throw err
               expect(res.status).toBe(400)
               expect(res.body).toHaveProperty('errors', expect.any(Array))
               expect(res.body.errors).toEqual(expect.arrayContaining(errors))
               done()
            })
    })
})

describe('read all locations/success case', () => {
    test ('success read all locations data', (done) => {
        request (app)
            .get(`/locations/`)
            .send()
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty('results', expect.any(Array))
               done()
            })
    })
})

let locationId = null

beforeAll(function(done) {
    Location.create({
        name: 'depok',
        waterLevel: 3.3,
        latitude: -6.385589,
        longitude: 106.830711,
        city: 'west jakarta',
        area: 'jakarta',
        danger: false
    })
    .then(location => {
        locationId = location.id
        done()
    })
    .catch(err => {
        done(err)
    })
})

describe('create location/success case', () => {
    test ('success adding city to database', (done) => {
        request (app)
            .put(`/locations/${locationId}`)
            .send({
                name: `depok barat`,
                waterLevel: 3.3,
                latitude: -6.385589,
                longitude: 106.830711,
                city: 'west jakarta',
                area: 'jakarta',
                danger: true
            })
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty('msg', "Success Update Location")
               done()
            })
    })
})

describe('create location/success case', () => {
    test ('success adding city to database', (done) => {
        request (app)
            .put(`/locations/${locationId}`)
            .send({
                name: `depok barat`,
                waterLevel: 51,
                latitude: -6.385589,
                longitude: 106.830711,
                city: 'west jakarta',
                area: 'jakarta',
                danger: true
            })
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty('msg', "Success Update Location")
               done()
            })
    })
})

describe('read one location/success case', () => {
    test ('success read one location data', (done) => {
        request (app)
            .get(`/locations/${locationId}`)
            .send()
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty('result', expect.any(Object))
               done()
            })
    })
})

describe('read one location/error case', () => {
    test ('invalid location id', (done) => {
        request (app)
            .get(`/locations/${locationId + 10}`)
            .end( function(err, res) {
                const errors = ['The data you looking for is not found!!']
                if (err) throw err
                expect(res.status).toBe(404)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
            })
    })
})

// describe('delete location/success case', () => {
//     test ('success removing city from location list', (done) => {
//         request (app)
//             .delete(`/locations/${locationId}`)
//             .send()
//             .end( function(err, res) {
//                if (err) throw err
//                expect(res.status).toBe(200)
//                expect(res.body).toHaveProperty('msg', 'Success Delete Location')
//                done()
//             })
//     })
// })

// describe('delete location/error case', () => {
//     test ('invalid location id', (done) => {
//         request (app)
//             .delete(`/locations/${locationId + 10}`)
//             .send()
//             .end( function(err, res) {
//                 const errors = ['The data you looking for is not found!!']
//                 if (err) throw err
//                 expect(res.status).toBe(404)
//                 expect(res.body).toHaveProperty('errors', expect.any(Array))
//                 expect(res.body.errors).toEqual(expect.arrayContaining(errors))
//                 done()
//             })
//     })
// })

describe('Search by Name', () => {
    test ('success search by name', (done) => {
        request (app)
            .get(`/locations/search/${location_data.name}`)
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty('data', expect.any(Array))
               done()
            })
    })
})

describe('Search by City', () => {
    test ('success search by City', (done) => {
        request (app)
            .get(`/locations/find/${location_data.area}`)
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty('data', expect.any(Array))
               done()
            })
    })
})
