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

describe('read one location/success case', () => {
    test ('success read one location data', (done) => {
        request (app)
            .get(`/subscribes/${locationId}`)
            .send({
                userId: user_id
            })
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty('id', expect.any(Number))
               expect(res.body).toHaveProperty('userId', userId)
               expect(res.body).toHaveProperty('locationId', locationId)
               done()
            })
    })
})

describe('read one subscribe/error case', () => {
    test ('didnt have userId', (done) => {
        request (app)
            .get(`/subscribes/${locationId}`)
            .send({
                userId: null
            })
            .end( function(err, res) {
                const errors = ['invalid user id']
                if (err) throw err
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
            })
    })

    test ('didnt have locationId', (done) => {
        request (app)
            .get(`/subscribes/${locationId + 1}`)
            .send({
                userId: user_id
            })
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

describe('delete subscribe/success case', () => {
    test ('success removing city from subscribed list', (done) => {
        request (app)
            .delete(`/subscribes/${locationId}`)
            .send({
                userId: user_id
            })
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty('message', 'success removing city from your subscribed list')
               done()
            })
    })
})

describe('subscribe/error case', () => {
    test ('invalid user id', (done) => {
        request (app)
            .delete(`/subscribe/${locationId}`)
            .send({
                userId: null
            })
            .end( function(err, res) {
                const errors = ['invalid userId']
               if (err) throw err
               expect(res.status).toBe(400)
               expect(res.body).toHaveProperty('errors', expect.any(Array))
               expect(res.body.errors).toEqual(expect.arrayContaining(errors))
               done()
            })
    })

    test ('invalid location id', (done) => {
        request (app)
            .delete(`/subscribe/${locationId + 1}`)
            .send({
                userId: user_id
            })
            .end( function(err, res) {
                const errors = ['invalid locationId']
               if (err) throw err
               expect(res.status).toBe(400)
               expect(res.body).toHaveProperty('errors', expect.any(Array))
               expect(res.body.errors).toEqual(expect.arrayContaining(errors))
               done()
            })
    })
})