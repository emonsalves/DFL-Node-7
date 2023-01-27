const supertest = require('supertest')
const app = require('../app')

describe('Test EndPoint Cafes', () => {

    it('Test Case 1: Validation Array with Element Response', async () => {
        const response = await supertest(app)
            .get('/cafes')
            .send()
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toBeGreaterThan(0)
    })

    it('Test Case 2: Validation Delete Cafe', async () => {
        const id = 9999
        const response = await supertest(app)
            .get(`/cafes/${id}`)
            .send()
        expect(response.statusCode).toBe(404)
    })

    it('Test Case 3: Validation Creation Cafe', async () => {
        const id = Math.floor(Math.random() * 999)
        const newCafe = {
            id,
            nombre: "newCafe"
        }
        const response = await supertest(app)
            .post('/cafes')
            .send(newCafe)
        expect(response.statusCode).toBe(201)
        expect(response.body).toContainEqual(newCafe)
    })

    it('Test Case 4: Validation Update Cafe', async () => {
        const id = 1
        const updateCafe = {
            "id": 2,
            "nombre": "CafeUpdate"
        }
        const response = await supertest(app)
            .put(`/cafes/${id}`)
            .send(updateCafe)
        expect(response.statusCode).toBe(400)
    })
})