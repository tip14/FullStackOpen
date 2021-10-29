const mongoose = require('mongoose')
const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)


module.exports = Blog