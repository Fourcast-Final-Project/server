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
        name: 'depok',
        waterLevel: 3.3,
        latitude: -6.385589,
        longitude: 106.830711
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

describe('create subscribe/success case', () => {
    test ('success adding city to subscribed list', (done) => {
        request (app)
            .post('/subscribes')
            .set('access_token', access_token)
            .send({
                LocationId
            })
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(201)
               expect(res.body).toHaveProperty('msg', "subscribe location succeed")
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

    test ('invalid subscribe id', (done) => {
        request (app)
            .get(`/subscribes/${subscribeId + 10}`)
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