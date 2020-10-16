const request = require('supertest')
const app = require('../app')
const { History } = require('../models')

const history_data = {
    location: 'depok',
    time: '11 Januari 2020',
    waterLevel: 7.5,
    userId: null
}

let user_id = null

beforeAll(function(done) {
    User.create({
        email: 'fourcast@mail.com',
        password: '123456'
    })
    .then(user => {
        history_data.userId = user.id
        user_id = user.id
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
            .send({
                location: '',
                time: '11 Januari 2020',
                waterLevel: 7.5,
                userId: null
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

    test ('invalid time', (done) => {
        request (app)
            .post('/histories')
            .send({
                location: 'depok',
                time: '',
                waterLevel: 7.5,
                userId: user_id
            })
            .end( function(err, res) {
                const errors = ["invalid history's time"]
                if (err) throw err
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
            })
    })

    test ('invalid user id', (done) => {
        request (app)
            .post('/histories')
            .send({
                location: 'depok',
                time: '11 Januari 2020',
                waterLevel: 7.5,
                userId: null
            })
            .end( function(err, res) {
                const errors = ['histories must have userId']
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
            .send({
                userId: user_id
            })
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
        location: 'depok',
        time: '11 Januari 2020',
        waterLevel: 7.5,
        userId: user_id
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
            .send()
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty('result', expect.any(Object))
               done()
            })
    })
})

describe('read one history/error case', () => {
    test ('invalid history id', (done) => {
        request (app)
            .get(`/histories/${historyId + 10}`)
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

describe('delete history/success case', () => {
    test ('success removing history from histories list', (done) => {
        request (app)
            .delete(`/histories/${historyId}`)
            .send()
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty('msg', 'Success Delete History')
               done()
            })
    })
})

describe('delete history/error case', () => {
    test ('invalid history id', (done) => {
        request (app)
            .delete(`/histories/${historyId + 10}`)
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