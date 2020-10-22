const request = require('supertest')
const app = require('../app')
const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')

let access_token = null
let location = 'jakarta'

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


describe('get data weather/ success case', () => {
    test ('success get all data weather', (done) => {
        request (app)
            .get(`/weather/${location}`)
            .set('access_token', access_token)
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty('name', "Jakarta")
               done()
            })
    })
})

describe('get data weather/ failed case', () => {
    test ('failed to get all data weather because access token invalid', (done) => {
        request (app)
            .get(`/weather/hcada`)
            .set('access_token', access_token)
            .end( function(err, res) {
                const errors = ["Internal Server Error"]
                if (err) throw err
                expect(res.status).toBe(500)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
            })
    })
})

describe('get data weather/ failed case', () => {
    test ('failed to get all data weather because access token null', (done) => {
        request (app)
            .get(`/weather/${location}`)
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