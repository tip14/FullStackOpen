const _collection = require('lodash/collection')

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, curr) => total + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (!blogs || blogs.length == 0) return {}

    const sorted = Array.from(blogs).sort((a, b) => b.likes - a.likes)
    const favorite = sorted[0];
    delete favorite._id
    delete favorite.__v
    delete favorite.url
    return favorite
}

const mostBlogs = (blogs) => {
   const authorBlogsCount = _collection.reduce(blogs, (result, blog) => {
        if(!result[blog.author]) {
            result[blog.author] = 1;
        } else {
            result[blog.author] += 1;
        }
        return result;
    }, {})

    let a;
    let c;
    for(const author in authorBlogsCount) {
        if(!a && !c) {
            a = author;
            c = authorBlogsCount[author];
        } else {
            if(authorBlogsCount[author] > c) {
                a = author;
                c = authorBlogsCount[author];
            }
        }
    }

    return {author: a, blogs: c}
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}