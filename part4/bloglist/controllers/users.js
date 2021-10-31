const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const result = await User.find({})
    response.send(result);
})

usersRouter.post('/', async (request, response) => {
    const body = request.body;
    if (!body.password || body.password.length < 3) {
        response.status(400).send({error: "Password should be at least 3 chars long"})
        return
    }

    const passwordHash = await bcrypt.hash(body.password, 10)
    const newUser = new User({... body, password: passwordHash})
    try {
        const result = await newUser.save();
        response.status(201).send(result)
    } catch (e) {
        response.status(400).send(e.message)
    }
})

module.exports = usersRouter