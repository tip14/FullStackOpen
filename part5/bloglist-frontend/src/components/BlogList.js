import Blog from "./Blog";

const BlogList = ({blogs, addLike}) => {

    const sortedBlogs = blogs.sort((a, b) => {
        if (a.likes == b.likes) {
            return 0;
        } else if (a.likes > b.likes) {
            return -1;
        } else {
            return 1;
        }
    })

    return (
        <>
            {sortedBlogs.map(blog =>
                <Blog key={blog.id} blog={blog} addLike={addLike}/>
            )}
        </>
    )
}

export default BlogList