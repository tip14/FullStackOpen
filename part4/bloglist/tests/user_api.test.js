const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const mongoose = require('mongoose')
const User = require('../models/user')


const initialUsers = [
    {
        name: 'John Walker',
        username: 'john_walker',
        password: '12345678'
    },
    {
        name: 'Simon Blesk',
        username: 'simon777',
        password: '*&FGOf23hf8o2'
    },
    {
        name: 'Alza White',
        username: 'alzaaa',
        password: 'abcde123'
    },

]

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsers)
})

describe('Read operations tests', () => {
    test('should return all users', async () => {
        const result = await api.get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(result.body.length).toBeGreaterThan(0)
        expect(result.body.length).toBe(initialUsers.length)
    })

    test('unique identifier property of the users should be named id', async () => {
        const result = await api.get('/api/users')
        const users = result.body

        users.forEach(b => {
            expect(b.id).toBeDefined()
        });
    })

    test('password hash should not be in response', async () => {
        const result = await api.get('/api/users')
        const users = result.body

        users.forEach(b => {
            expect(b.password).not.toBeDefined()
        });
    })
});

describe('Create operations tests', () => {
    test('should save new user to database', async () => {

        const newUser = {
            name: 'New User',
            username: 'new_user_from_test',
            password: "hardToGuessPass123"
        }

        const result = await api.post('/api/users')
            .send(newUser)
            .expect(201)

        const savedUser = result.body

        expect(savedUser.name).toBe(newUser.name)
        expect(savedUser.username).toBe(newUser.username)
        expect(savedUser.password).not.toBe(newUser.password)
        expect(savedUser.id).toBeDefined();

    })
})

afterAll(() => mongoose.connection.close())