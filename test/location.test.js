const request = require('supertest')
const app = require('../app')

const location_data = {
    name: 'depok',
    waterLevel: 3.3,
    latitude: -6.385589,
    longitude: 106.830711
}

describe('create location/success case', () => {
    test ('success adding city to database', (done) => {
        request (app)
            .post('/locations')
            .send(location_data)
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(201)
               expect(res.body).toHaveProperty('id', expect.any(Number))
               expect(res.body).toHaveProperty('name', location_data.name)
               expect(res.body).toHaveProperty('latitude', location_data.latitude)
               expect(res.body).toHaveProperty('longitude', location_data.longitude)
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
                longitude: 106.830711
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

    test ('invalid water level', (done) => {
        request (app)
            .post('/locations')
            .send({
                name: 'depok',
                waterLevel: -1,
                latitude: -6.385589,
                longitude: 106.830711
            })
            .end( function(err, res) {
                const errors = ['water level must be equal or more than 0']
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
                longitude: 106.830711
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
                longitude: 186.830711
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
               expect(res.body).toHaveProperty('locations', expect.any(Array))
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
        longitude: 106.830711
    })
    .then(location => {
        locationId = location.id
        done()
    })
    .catch(err => {
        done(err)
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
               expect(res.body).toHaveProperty('id', expect.any(Number))
               expect(res.body).toHaveProperty('name', location_data.name)
               expect(res.body).toHaveProperty('waterLevel', location_data.waterLevel)
               expect(res.body).toHaveProperty('latitude', location_data.latitude)
               expect(res.body).toHaveProperty('longitude', location_data.longitude)
               done()
            })
    })
})

describe('read one location/error case', () => {
    test ('invalid location id', (done) => {
        request (app)
            .get(`/locations/${locationId + 1}`)
            .end( function(err, res) {
                const errors = ['invalid location id']
                if (err) throw err
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
            })
    })
})

describe('delete location/success case', () => {
    test ('success removing city from location list', (done) => {
        request (app)
            .delete(`/locations/${locationId}`)
            .send()
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty('message', 'success removing city from your locations list')
               done()
            })
    })
})

describe('delete location/error case', () => {
    test ('invalid location id', (done) => {
        request (app)
            .delete(`/locations/${locationId + 1}`)
            .send()
            .end( function(err, res) {
                const errors = ['invalid location id']
                if (err) throw err
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
            })
    })
})