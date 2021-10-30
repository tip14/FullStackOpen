const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const mongoose = require('mongoose')

test('should return all blogs', async () => {
    const result = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(result.body.length).toBeGreaterThan(0)
    expect(result.body.length).toBe(3)
})


afterAll(() => mongoose.connection.close())