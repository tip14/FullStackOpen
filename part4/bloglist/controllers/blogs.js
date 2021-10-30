const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    if (!blog.title && !blog.url) {
        response.status(400).send()
        return;
    }

    if (!blog.likes) {
        blog.likes = 0
    }

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        });
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).send()
})


module.exports = blogsRouter