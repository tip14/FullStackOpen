const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const result = await User.find({})
    response.send(result);
})

usersRouter.post('/', async (request, response) => {
    const body = request.body;
    const passwordHash = await bcrypt.hash(body.password, 10)
    const newUser = new User({... body, password: passwordHash})
    const result = await newUser.save();

    response.status(201).send(result)
})

module.exports = usersRouter