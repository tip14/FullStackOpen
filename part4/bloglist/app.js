const config = require('./utils/config')
const mongoose = require('mongoose')
const express = require('express')
require('express-async-errors')
const middleware = require('./middleware/middleware')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const app = express()

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

app.use(cors())

app.use(middleware.tokenExtractor)
app.use(express.json())
app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)


module.exports = app;
