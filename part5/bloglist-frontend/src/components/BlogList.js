import Blog from "./Blog";
import UserInfo from "./UserInfo";

const BlogList = ({blogs, user}) => {
    return (
        <>
            <h2>blogs</h2>
            <UserInfo user={user} />
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog}/>
            )}
        </>
    )
}

export default BlogList