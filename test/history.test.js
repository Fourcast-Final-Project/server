const request = require('supertest')
const app = require('../app')
const { History, User } = require('../models')
const { generateToken } = require('../helpers/jwt')

const history_data = {
    LocationId: 2,
    waterLevel: 7.5,
    image: "img.png"
}

let user_id = null
let access_token = null

beforeAll(function(done) {
    User.create({
        email: 'fourcast@mail.com',
        password: '123456'
    })
    .then(user => {
        user_id = user.id
        access_token = generateToken({ id: user.id, email: user.email })
        done()
    })
    .catch(err => {
        done(err)
    })
})

describe('create history/success case', () => {
    test ('success adding history to database', (done) => {
        request (app)
            .post('/histories')
            .set('access_token', access_token)
            .send(history_data)
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(201)
               expect(res.body).toHaveProperty('msg', "Success Create History")
               done()
            })
    })
})

describe('create history/error case', () => {
    test ('invalid location', (done) => {
        request (app)
            .post('/histories')
            .set('access_token', access_token)
            .send({
                LocationId: '',
                waterLevel: 7.5,
                image: "img.png"
            })
            .end( function(err, res) {
                const errors = ["Validation isNumeric on LocationId failed"]
                if (err) throw err
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
            })
    })

    test ('location null', (done) => {
        request (app)
            .post('/histories')
            .set('access_token', access_token)
            .send({
                waterLevel: 7.5,
                image: "img.png"
            })
            .end( function(err, res) {
                const errors = ["data didnt have LocationId"]
                if (err) throw err
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
            })
    })
})

describe('read all histories/success case', () => {
    test ('success read all histories data', (done) => {
        request (app)
            .get(`/histories/`)
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

let historyId = null

beforeAll(function(done) {
    History.create({
        LocationId: 2,
        waterLevel: 7.5,
        UserId: user_id
    })
    .then(history => {
        historyId = history.id
        done()
    })
    .catch(err => {
        done(err)
    })
})

describe('read one history/success case', () => {
    test ('success read one location data', (done) => {
        request (app)
            .get(`/histories/${historyId}`)
            .set('access_token', access_token)
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty('result', expect.any(Object))
               done()
            })
    })
})


describe('delete history/success case', () => {
    test ('success removing history from histories list', (done) => {
        request (app)
            .delete(`/histories/${historyId}`)
            .set('access_token', access_token)
            .send()
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty('msg', 'success removing city from user history')
               done()
            })
    })
})

describe('delete history/error case', () => {
    test ('invalid history id', (done) => {
        request (app)
            .delete(`/histories/${historyId + 10}`)
            .set('access_token', access_token)
            .send()
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

describe('delete all history/success case', () => {
    test ('success removing all cities from user history', (done) => {
        request (app)
            .delete(`/histories`)
            .set('access_token', access_token)
            .send()
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty('msg', 'success removing all cities from user history')
               done()
            })
    })
})

describe('delete all histories/error case', () => {
    test ('invalid user id', (done) => {
        request (app)
            .delete(`/histories`)
            .set('access_token', "asasvsvfvdfv")
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