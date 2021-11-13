import React, { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog }) => {
    const [showDetails, setShowDetails] = useState(false)

    const toggle = () => setShowDetails(!showDetails)

    const getRemoveButton = () => {
        const userDataString = window.localStorage.getItem('userData');
        const userData = JSON.parse(userDataString)

        if (userData && blog.user.username === userData.username) {
            return <p>
                <button className="button_red" onClick={() => removeBlog(blog)}>remove</button>
            </p>;
        }

        return <></>
    }

    if (showDetails) {
        return (
            <div className="blog">
                <p>{blog.title}
                    <button onClick={toggle}>hide</button>
                </p>
                <p>{blog.url}</p>
                <p>likes {blog.likes}
                    <button className='add_like' onClick={() => addLike(blog)}>like</button>
                </p>
                <p>{blog.title}</p>
                {getRemoveButton()}
            </div>
        )
    } else {
        return (
            <div className="blog">
                {blog.title} {blog.author}
                <button onClick={toggle}>view</button>
            </div>
        )
    }

}

export default Blog