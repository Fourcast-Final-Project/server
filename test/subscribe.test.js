const request = require('supertest')
const app = require('../app')
const { User, Subscribe, Location } = require('../models')
const{ generateToken } = require('../helpers/jwt')

const subscribe_data = {
    UserId: 1,
    LocationId: 1
}

let UserId = null
let LocationId = null
let access_token = null

beforeAll(function(done) {
    Location.create({
        name: 'depok', // Kebon Jeruk
        area: 3.3, // West Jakarta
        city: 'Jakarta', // Jakarta
        waterLevel: 21.2,
        latitude: -6.385589,
        longitude: -6.385589
    })
    .then(location => {
        LocationId = location.id
        return User.create({
            email: 'fourcast@mail.com',
            password: '123456'
        })
    })
    .then(user => {
        UserId = user.id
        access_token = generateToken({ id: user.id, email: user.email })
        done()
    })
    .catch(err => {
        done(err)
    })
})

let newLocationId = LocationId+7

describe('create subscribe/success case', () => {
    test ('success adding city to subscribed list', (done) => {
        request (app)
            .post('/subscribes')
            .set('access_token', access_token)
            .send({
                LocationId: newLocationId
            })
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(201)//200
               expect(res.body).toHaveProperty('msg', "subscribe location succeed")//you already subscribe for this location before
               done()
            })
    })
})


describe('create subscribe/success case', () => {
    test ('failed adding city to subscribed list because already subscribe', (done) => {
        request (app)
            .post('/subscribes')
            .set('access_token', access_token)
            .send({
                LocationId: LocationId
            })
            .end( function(err, res) {
                const errors = ['you already subscribed']
                if (err) throw err
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
            })
    })
})



describe('create subscribe/error case', () => {
    test ('didnt have user_id', (done) => {
        request (app)
            .post('/subscribes')
            .set('access_token', "sfvdss")
            .send({
                LocationId
            })
            .end( function(err, res) {
                const errors = ["user must have access token"]
               if (err) throw err
               expect(res.status).toBe(400)
               expect(res.body).toHaveProperty('errors', expect.any(Array))
               expect(res.body.errors).toEqual(expect.arrayContaining(errors))
               done()
            })
    })

    describe('create subscribe/error case', () => {
        test ('didnt have user_id', (done) => {
            request (app)
                .post('/subscribes')
                .send({
                    LocationId
                })
                .end( function(err, res) {
                    const errors = ["Your authentication failed!!"]
                   if (err) throw err
                   expect(res.status).toBe(401)
                   expect(res.body).toHaveProperty('errors', expect.any(Array))
                   expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                   done()
                })
        })
    })


    describe('create subscribe/error case', () => {
        test ('didnt have user_id', (done) => {
            request (app)
                .get('/subscribes')
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJ0ZXN0QG1haWwuY29tIiwiaWF0IjoxNjAzMTc3NzkwfQ.DWvWVSc4lXSj0ak52qPUNiIt7suMYewAT_1-TnYyp9E')
                .send({
                    LocationId
                })
                .end( function(err, res) {
                    const errors = ["The data you looking for is not found!!"]
                   if (err) throw err
                   expect(res.status).toBe(404)
                   expect(res.body).toHaveProperty('errors', expect.any(Array))
                   expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                   done()
                })
        })
    })

    test ('didnt have location_id', (done) => {
        request (app)
            .post('/subscribes')
            .set('access_token', access_token)
            .send({
                LocationId: null
            })
            .end( function(err, res) {
                const errors = ['data didnt have LocationId']
               if (err) throw err
               expect(res.status).toBe(400)
               expect(res.body).toHaveProperty('errors', expect.any(Array))
               expect(res.body.errors).toEqual(expect.arrayContaining(errors))
               done()
            })
    })
})

let subscribeId = null

beforeAll(function(done) {
    Subscribe.create({
       UserId,
       LocationId
    })
    .then(data => {
        subscribeId = data.id
        done()
    })
    .catch(err => done(err))
})

describe('read all subscribe/success case', () => {
    test ('success read all subscribe data', (done) => {
        request (app)
            .get(`/subscribes/`)
            .set('access_token', access_token)
            .send()
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty('results', expect.any(Array))
               done()
            })
    })
})

describe('read all subscribe/error case', () => {
    test ('didnt have UserId', (done) => {
        request (app)
            .get('/subscribes')
            .set('access_token', 'acacdscsvs')
            .send()
            .end( function(err, res) {
                const errors = ['user must have access token']
                if (err) throw err
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
            })
    })
})

describe('read one subscribe/success case', () => {
    test ('success read one subscribed data', (done) => {
        request (app)
            .get(`/subscribes/${subscribeId}`)
            .set('access_token', access_token)
            .send()
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty('result', expect.any(Object))
               done()
            })
    })
})

describe('read one subscribe/error case', () => {
    test ('didnt have UserId', (done) => {
        request (app)
            .get(`/subscribes/${subscribeId}`)
            .set('access_token', 'ssvdsass')
            .send()
            .end( function(err, res) {
                const errors = ['user must have access token']
                if (err) throw err
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
            })
    })

    test ('didnt have UserId', (done) => {
        request (app)
            .get(`/subscribes/${subscribeId}`)
            .send()
            .end( function(err, res) {
                const errors = ["Your authentication failed!!"]
                if (err) throw err
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
            })
    })


    test ('invalid subscribe id', (done) => {
        request (app)
            .get(`/subscribes/${subscribeId + 1000}`)
            .set('access_token', access_token)
            .send()
            .end( function(err, res) {
                const errors = ["You are not authorized for this!!"]
                if (err) throw err
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
            })
    })
})

describe('delete subscribe/success case', () => {
    test ('success removing city from subscribed list', (done) => {
        request (app)
            .delete(`/subscribes/${subscribeId}`)
            .set('access_token', access_token)
            .send()
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty('msg', 'success removing city from your subscribed list')
               done()
            })
    })
})

describe('delete subscribe/error case', () => {
    test ('invalid user id', (done) => {
        request (app)
            .delete(`/subscribes/${subscribeId}`)
            .set('access_token', "dacdscsc")
            .send()
            .end( function(err, res) {
                const errors = ['user must have access token']
               if (err) throw err
               expect(res.status).toBe(400)
               expect(res.body).toHaveProperty('errors', expect.any(Array))
               expect(res.body.errors).toEqual(expect.arrayContaining(errors))
               done()
            })
    })

    test ('invalid location id', (done) => {
        request (app)
            .delete(`/subscribes/${subscribeId + 10}`)
            .set('access_token', access_token)
            .send()
            .end( function(err, res) {
                const errors = ["You are not authorized for this!!"]
               if (err) throw err
               expect(res.status).toBe(401)
               expect(res.body).toHaveProperty('errors', expect.any(Array))
               expect(res.body.errors).toEqual(expect.arrayContaining(errors))
               done()
            })
    })
})

describe('delete all subscribe/success case', () => {
    test ('success removing all cities from user subscribed list', (done) => {
        request (app)
            .delete(`/subscribes`)
            .set('access_token', access_token)
            .send()
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty('msg', 'success removing all cities from user subscribed list')
               done()
            })
    })
})

describe('delete all subscribe/error case', () => {
    test ('invalid user id', (done) => {
        request (app)
            .delete(`/subscribes`)
            .set('access_token', "cadcaxa")
            .send()
            .end( function(err, res) {
                const errors = ['user must have access token']
               if (err) throw err
               expect(res.status).toBe(400)
               expect(res.body).toHaveProperty('errors', expect.any(Array))
               expect(res.body.errors).toEqual(expect.arrayContaining(errors))
               done()
            })
    })
})