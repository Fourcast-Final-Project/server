const request = require('supertest')
const app = require('../app')

const subscribe_data = {
    user_id: 1,
    city: 'depok',
    zipCode: '10550'
    
}

describe('subscribe/success case', () => {
    test ('success adding city to subscribed list', (done) => {
        request (app)
            .post('/subscribe')
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