import Blog from "./Blog";
import UserInfo from "./UserInfo";

const BlogList = ({blogs, user, logout}) => {
    return (
        <>
            <h2>blogs</h2>
            <UserInfo user={user} logout={logout}/>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog}/>
            )}
        </>
    )
}

export default BlogList