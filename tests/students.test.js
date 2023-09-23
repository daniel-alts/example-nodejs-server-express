const supertest = require('supertest');
const app = require('../api');
const { connect } = require('./database');
const UserModel = require('../models/user.model');

// Test suite
describe('Students Route Tests', () => {
    let connection;
    let token;
    // before hook
    beforeAll(async () => {
        connection = await connect()
    })

    beforeEach(async() => {
        // create a user
        const user = await UserModel.create({
            name: "sojidan",
            email: "dan@example.com",
            contact: "lagos",
            phone_number: "90345454565",
            gender: "male",
            password: "12345678"
        });

        // login that user
        const response = await supertest(app)
        .post('/users/login')
        .set('content-type', 'application/json')
        .send({
            email: "dan@example.com",
            password: "12345678"
        })

        // store the token in a global object
        token = response.body.token
    })

    afterEach(async () => {
        await connection.cleanup()
    })
    
    // after hook
    afterAll(async () => {
        await connection.disconnect()
    })

    // test case
    it('should return a list of students', async () => {
        const response = await supertest(app).get('/students?gender=male')
        .set('authorization', `Bearer ${token}`)
        .set('content-type', 'application/json')

        expect(response.status).toEqual(200);
        expect(response.body).toMatchObject({
            data: expect.any(Array),
            error: null
        });
    })
})