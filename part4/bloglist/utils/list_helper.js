const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, curr) => total + curr.likes, 0)
}

module.exports = {
    dummy, totalLikes
}