const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', (request, response) => {
    Blog
        .find({}).populate('user', { username: 1, name: 1 })
        .then(blogs => {
            response.json(blogs)
        })
})


blogsRouter.post('/', async (request, response) => {
    const token = request.token
    const decodedToken = token ? jwt.verify(token, process.env.SECRET) : null;
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const someUser = await User.findById(decodedToken.id);

    const blog = new Blog({...request.body, user: someUser._id})

    if (!blog.title && !blog.url) {
        response.status(400).send()
        return;
    }

    if (!blog.likes) {
        blog.likes = 0
    }

    const result = await blog.save()

    someUser.blogs = someUser.blogs.concat(result._id)
    await someUser.save()

    response.status(201).json(result)
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const likesUpdate = {likes: request.body.likes}

    const updatedBlog = await Blog.findByIdAndUpdate(id, likesUpdate, {new: true})
    response.json(updatedBlog)
})


blogsRouter.delete('/:id', async (request, response) => {
    const token = request.token
    const decodedToken = token ? jwt.verify(token, process.env.SECRET) : null;
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const foundBlog = await Blog.findById(request.params.id)
    if (!foundBlog.user || foundBlog.user.toString() !== decodedToken.id) {
        return response.status(401).json({ error: 'only author could delete blog' })
    }
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).send()

})


module.exports = blogsRouter