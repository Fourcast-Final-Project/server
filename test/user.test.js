const request = require('supertest')
const app = require('../app')

const user_data = {
    email: 'fourcast@mail.com',
    password: '123456'
}


describe('register/success case', () => {
    test ('enter email and password correctly', (done) => {
        request (app)
            .post('/register')
            .send(user_data)
            .end( function(err, res) {
               if (err) throw err
               expect(res.status).toBe(201)
               expect(res.body).toHaveProperty('msg', 'Success Create User')
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
                const errors = [ 'password character must be more than 5 and less than 15']
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
                const errors = [ 'Invalid Email Address']
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
               expect(res.body).toHaveProperty('access_token', expect.any(String))
               expect(res.body).toHaveProperty('email', user_data.email)
               expect(res.body).toHaveProperty('id', expect.any(Number))
               expect(res.body).toHaveProperty('msg', "login success")
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
                const errors = [ 'Your email or password is wrong!!']
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
                const errors = [ 'Your email or password is wrong!!']
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
                const errors = [ 'Your email or password is wrong!!']
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
                const errors = [ 'Your email or password is wrong!!']
               if (err) throw err
               expect(res.status).toBe(400)
               expect(res.body).toHaveProperty('errors', expect.any(Array))
               expect(res.body.errors).toEqual(expect.arrayContaining(errors))
               done()
            })
    })
})

