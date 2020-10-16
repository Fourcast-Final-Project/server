const request = require('supertest')
const app = require('../app')

const user_data = {
    email: 'fourcastmail.com',
    password: '123456'
}

describe('register/success case', () => {
    test ('enter email and password correctly', (done) => {
        request (app)
            .post('/register')
            .send(user_data)
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty('id', expect.any(Number))
               expect(res.body).toHaveProperty('email', user_data.email)
               expect(res.body).not.toHaveProperty('password')
               done()
            })
    })
})

describe('register/error case', () => {
    test ('didnt input password', (done) => {
        request (app)
            .post('/register')
            .send({
                email: 'fourcast@mail.com',
                password: ''
            })
            .end(function(err, res) {
                const errors = [ 'user must enter a password']
               if (err) throw err
               expect(res.status).toBe(400)
               expect(res.body).toHaveProperty('errors', expect.any(Array))
               expect(res.body.errors).toEqual(expect.arrayContaining(errors))
               done()
            })
    })

    test ('didnt input email', (done) => {
        request (app)
            .post('/register')
            .send({
                email: '',
                password: '123456'
            })
            .end( function(err, res) {
                const errors = [ 'user must enter his/her email']
               if (err) throw err
               expect(res.status).toBe(400)
               expect(res.body).toHaveProperty('errors', expect.any(Array))
               expect(res.body.errors).toEqual(expect.arrayContaining(errors))
               done()
            })
    })
})

describe('login/success case', () => {
    test ('enter email and password correctly', (done) => {
        request (app)
            .post('/login')
            .send(user_data)
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty('id', expect.any(Number))
               expect(res.body).toHaveProperty('email', user_data.email)
               done()
            })
    })
})

describe('login/error case', () => {
    test ('invalid password', (done) => {
        request (app)
            .post('/login')
            .send({
                email: 'fourcast@mail.com',
                password: '123'
            })
            .end( function(err, res) {
                const errors = [ 'invalid email or password']
                if (err) throw err
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
            })
    })

    test ('invalid email', (done) => {
        request (app)
            .post('/login')
            .send({
                email: 'fooourcast@mail.com',
                password: '123456'
            })
            .end( function(err, res) {
                const errors = [ 'invalid email or password']
               if (err) throw err
               expect(res.status).toBe(400)
               expect(res.body).toHaveProperty('errors', expect.any(Array))
               expect(res.body.errors).toEqual(expect.arrayContaining(errors))
               done()
            })
    })

    test ('didnt input email', (done) => {
        request (app)
            .post('/login')
            .send({
                email: '',
                password: '123456'
            })
            .end( function(err, res) {
                const errors = [ 'email and password are required']
               if (err) throw err
               expect(res.status).toBe(400)
               expect(res.body).toHaveProperty('errors', expect.any(Array))
               expect(res.body.errors).toEqual(expect.arrayContaining(errors))
               done()
            })
    })

    test ('didnt input password', (done) => {
        request (app)
            .post('/login')
            .send({
                email: 'fourcast@mail.com',
                password: ''
            })
            .end( function(err, res) {
                const errors = [ 'email and password are required']
               if (err) throw err
               expect(res.status).toBe(400)
               expect(res.body).toHaveProperty('errors', expect.any(Array))
               expect(res.body.errors).toEqual(expect.arrayContaining(errors))
               done()
            })
    })
})

