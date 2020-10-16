const request = require('supertest')
const app = require('../app')
const { User, Subscribe } = require('../models')

const subscribe_data = {
    UserId: 1,
    LocationId: 1
}

let UserId = null
let LocationId = null

beforeAll(function(done) {
    Location.create({
        name: 'depok',
        waterLevel: 3.3,
        latitude: -6.385589,
        longitude: 106.830711
    })
    then(location => {
        LocationId = location.id
        return User.create({
            email: 'fourcast@mail.com',
            password: '123456'
        })
    })
    .then(user => {
        UserId = user.id
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
            .send({
                UserId,
                LocationId
            })
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(201)
               expect(res.body).toHaveProperty('id', expect.any(Number))
               expect(res.body).toHaveProperty('userId', subscribe_data.userId)
               expect(res.body).toHaveProperty('locationId', subscribe_data.locationId)
               done()
            })
    })
})

describe('create subscribe/error case', () => {
    test ('didnt have user_id', (done) => {
        request (app)
            .post('/subscribes')
            .send({
                UserId: null,
                LocationId
            })
            .end( function(err, res) {
                const errors = ['data didnt have UserId']
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
            .send({
                UserId,
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
            .send({
                UserId
            })
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty('subscribeds', expect.any(Array))
               done()
            })
    })
})

describe('read all subscribe/error case', () => {
    test ('didnt have UserId', (done) => {
        request (app)
            .get('/subscribes')
            .send({
                UserId: null
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
})

describe('read one subscribe/success case', () => {
    test ('success read one subscribed data', (done) => {
        request (app)
            .get(`/subscribes/${LocationId}`)
            .send({
                UserId
            })
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty('id', expect.any(Number))
               expect(res.body).toHaveProperty('UserId', UserId)
               expect(res.body).toHaveProperty('LocationId', LocationId)
               done()
            })
    })
})

describe('read one subscribe/error case', () => {
    test ('didnt have UserId', (done) => {
        request (app)
            .get(`/subscribes/${LocationId}`)
            .send({
                UserId: null
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

    test ('didnt have LocationId', (done) => {
        request (app)
            .get(`/subscribes/${LocationId + 10}`)
            .send({
                UserId
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
            .delete(`/subscribes/${LocationId}`)
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

describe('delete subscribe/error case', () => {
    test ('invalid user id', (done) => {
        request (app)
            .delete(`/subscribes/${LocationId}`)
            .send({
                UserId: null
            })
            .end( function(err, res) {
                const errors = ['invalid UserId']
               if (err) throw err
               expect(res.status).toBe(400)
               expect(res.body).toHaveProperty('errors', expect.any(Array))
               expect(res.body.errors).toEqual(expect.arrayContaining(errors))
               done()
            })
    })

    test ('invalid location id', (done) => {
        request (app)
            .delete(`/subscribes/${LocationId + 10}`)
            .send({
                UserId
            })
            .end( function(err, res) {
                const errors = ['invalid LocationId']
               if (err) throw err
               expect(res.status).toBe(400)
               expect(res.body).toHaveProperty('errors', expect.any(Array))
               expect(res.body.errors).toEqual(expect.arrayContaining(errors))
               done()
            })
    })
})