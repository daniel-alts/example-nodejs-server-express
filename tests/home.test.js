const supertest = require('supertest');
const app = require('../api');

// Test suite
describe('Home Route', () => {

    // Test case
    it('should return sucess on calling home route', async () => {
        const response = await supertest(app).get('/').set('content-type', 'application/json')

        expect(response.status).toEqual(200)
        expect(response.body).toEqual({ message: 'success', status: true });
    })

     // Test case
     it('should return failure on calling route that does not exist', async() => {
        const response = await supertest(app).get('/undefined').set('content-type', 'application/json')

        expect(response.status).toEqual(404)
        expect(response.body).toEqual({
            data: null,
            error: 'Route not found'
        })
     })
})
