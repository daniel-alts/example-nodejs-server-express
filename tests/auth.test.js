const supertest = require('supertest');
const app = require('../api');
const { connect } = require('./database');

// Test suite
describe('Authentication Tests', () => {
    let connection
    // before hook
    beforeAll(async () => {
        connection = await connect()
    })

    afterEach(async () => {
        await connection.cleanup()
    })
    
    // after hook
    afterAll(async () => {
        await connection.disconnect()
    })


    // Test case
    it('should successfully register a user', async () => {
        const response = await supertest(app)
        .post('/users/signup')
        .set('content-type', 'application/json')
        .send({
            name: "sojidan",
            password: "12345678",
            email: "dan@example.com",
            contact: "lagos",
            phone_number: "90345454565",
            gender: "male"
        })

        // expectations
        expect(response.status).toEqual(201);
        expect(response.body.user).toMatchObject({
            name: "sojidan",
            email: "dan@example.com",
            contact: "lagos",
            phone_number: "90345454565",
            gender: "male"
        })
    })
})
