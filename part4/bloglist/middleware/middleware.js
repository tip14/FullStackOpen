const {response} = require("express");
const jwt = require("jsonwebtoken");
const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }

    next()
}

const userExtractor = (request, response, next) => {
    if (request.token) {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        request.user = decodedToken.id
    }

    next()
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        })
    }

    next(error)
}

module.exports = {tokenExtractor, userExtractor, errorHandler}