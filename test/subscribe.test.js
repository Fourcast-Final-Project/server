const request = require('supertest')
const app = require('../app')

const subscribe_data = {
    userId: 1,
    locationId: 1
}

let userId = null

beforeAll(function(done) {
    User.create({
        email: 'fourcast@mail.com',
        password: '123456'
    })
    .then(result => {
        return User.findOne({
            where: {
                id: result.data.id
            }
        })
    })
    .then(user => {
        userId = user.id
        done()
    })
    .catch(err => {
        done(err)
    })
})

afterAll(function(done) {
    if (process.env.NODE_ENV == 'test') {
        Product.destroy({truncate: true})
        .then(() => {
            done()
        })
        .catch(err => done(err))
    }
})

describe('create subscribe/success case', () => {
    test ('success adding city to subscribed list', (done) => {
        request (app)
            .post('/subscribes')
            .send(subscribe_data)
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
                userId: null,
                locationId: 1
            })
            .end( function(err, res) {
                const errors = ['data didnt have userId']
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
                userId: 1,
                locationId: null
            })
            .end( function(err, res) {
                const errors = ['data didnt have locationId']
               if (err) throw err
               expect(res.status).toBe(400)
               expect(res.body).toHaveProperty('errors', expect.any(Array))
               expect(res.body.errors).toEqual(expect.arrayContaining(errors))
               done()
            })
    })
})

let locationId = null
let user_id = null

beforeAll(function(done) {
    Product.create({
        name: 'Music Alley Classical',
        image_url: 'https://images-na.ssl-images-amazon.com/images/I/81tQhEEtiEL.jpg',
        price: 5000,
        stock: 31,
        userId
    })
    .then(data => {
        locationId = data.id
        user_id = data.userId
        done()
    })
    .catch(err => done(err))
})

describe('read all subscribe/success case', () => {
    test ('success read all subscribe data', (done) => {
        request (app)
            .get(`/subscribes/`)
            .send({
                user_id
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
    test ('didnt have userId', (done) => {
        request (app)
            .get('/subscribes')
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
})

describe('read one subscribe/success case', () => {
    test ('success read one subscribed data', (done) => {
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