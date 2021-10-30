const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const mongoose = require('mongoose')
const Blog = require('../models/blog')

beforeAll(async () => {
    await Blog.deleteMany({})
    console.log('cleared')

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

    const savePromises = initialBlogs.map(blog => new Blog(blog).save())

    await Promise.all(savePromises);

    console.log('done')
})




test('should return all blogs', async () => {
    const result = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(result.body.length).toBeGreaterThan(0)
    expect(result.body.length).toBe(3)
})

test('unique identifier property of the blog posts should be named id', async () => {
    const result = await api.get('/api/blogs')
    const blogs = result.body

    blogs.forEach(b => {
        expect(b.id).toBeDefined()
    });
})


test('should save new blog to the database', async () => {
    const resultBeforeAdding = await api.get('/api/blogs')
    const blogsCountBeforeAddingNewOne = resultBeforeAdding.body.length


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

    expect(blogsCountAfterAddingNewOne).toBe(blogsCountBeforeAddingNewOne + 1)
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



afterAll(() => mongoose.connection.close())