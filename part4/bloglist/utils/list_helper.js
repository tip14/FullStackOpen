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

module.exports = {
    dummy, totalLikes, favoriteBlog
}