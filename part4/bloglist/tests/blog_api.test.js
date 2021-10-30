const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const mongoose = require('mongoose')
const Blog = require('../models/blog')


const initialBlogs = [
    {
        title: 'How to test with supertest',
        url: 'https://newbeetest.com',
        author: 'John Walker',
        likes: 56,
    },
    {
        title: '5 tips for testing Node.js app',
        url: 'https://newbeetest.com',
        author: 'John Walker',
        likes: 105,
    },
    {
        title: 'Make Jest your friend',
        url: 'https://newbeetest.com',
        author: 'Sandra Ostin',
        likes: 87,
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

describe('Read operations tests', () => {
    test('should return all blogs', async () => {
        const result = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(result.body.length).toBeGreaterThan(0)
        expect(result.body.length).toBe(initialBlogs.length)
    })

    test('unique identifier property of the blog posts should be named id', async () => {
        const result = await api.get('/api/blogs')
        const blogs = result.body

        blogs.forEach(b => {
            expect(b.id).toBeDefined()
        });
    })
});

describe('Create opearations tests', () => {

    test('if the title and url are missing from the data, the backend responds with code 400 Bad Request', async () => {

        const newBlog = {
            likes: 1,
            author: 'New Writer'
        };

        const r = await api.post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('if the likes property is missing from the request, it will default to the value 0', async () => {

        const newBlog = {
            title: 'Blog without likes',
            url: 'https://newbeetest.com',
            author: 'New Writer',
        };

        const result = await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)

        const savedBlog = result.body

        expect(savedBlog.likes).toBeDefined()
        expect(savedBlog.likes).toBe(0)
    })


    test('should save new blog to the database', async () => {
        const newBlog = {
            title: 'Adding to database from test',
            url: 'https://newbeetest.com',
            author: 'New Writer',
            likes: 777
        };

        const result = await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)

        const savedBlog = result.body

        expect(savedBlog.author).toBe(newBlog.author)
        expect(savedBlog.title).toBe(newBlog.title)
        expect(savedBlog.url).toBe(newBlog.url)
        expect(savedBlog.likes).toBe(newBlog.likes)
        expect(savedBlog.id).toBeDefined()

        const resultAfterAdding = await api.get('/api/blogs')
        const blogsCountAfterAddingNewOne = resultAfterAdding.body.length

        expect(blogsCountAfterAddingNewOne).toBe(initialBlogs.length + 1)
    })
});

describe('Update operations tests', () => {
    test('should update only likes, ignoring other properties', async () => {
        const responseWithBlogs = await api.get('/api/blogs');
        const savedBlogs = responseWithBlogs.body;
        const firstBlog = savedBlogs[0];
        const idToUpdate = firstBlog.id;
        const updateData = {likes: 999, author: "Keks"}

        const responseWithUpdatedBlog = await api.put(`/api/blogs/${idToUpdate}`)
            .send(updateData)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const updatedBlog = responseWithUpdatedBlog.body

        expect(updatedBlog.id).toBe(firstBlog.id)
        expect(updatedBlog.author).toBe(firstBlog.author)
        expect(updatedBlog.title).toBe(firstBlog.title)
        expect(updatedBlog.url).toBe(firstBlog.url)
        expect(updatedBlog.likes).toBe(updateData.likes)

    })
})

describe('Delete operations tests', () => {
    test('should delete blog by id', async () => {

        const response = await api.get('/api/blogs');
        const savedBlogs = response.body;
        const idToDelete = savedBlogs[0].id;


        await api.delete(`/api/blogs/${idToDelete}`)
            .expect(204)


        const responseAfterDelete = await api.get('/api/blogs');
        const allBlogsFromDatabase = responseAfterDelete.body;

        expect(allBlogsFromDatabase.length).toBe(initialBlogs.length - 1);

        allBlogsFromDatabase.forEach(b => {
            expect(b.id).not.toBe(idToDelete)
        })


    })
});

afterAll(() => mongoose.connection.close())