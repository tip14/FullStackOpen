import React, {useState} from 'react'
const Blog = ({blog, addLike}) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggle = () => setShowDetails(!showDetails)

  if (showDetails) {
    return (
        <div className="blog">
          <p>{blog.title} <button onClick={toggle}>hide</button></p>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={() => addLike(blog)}>like</button></p>
          <p>{blog.title}</p>
        </div>
    )
  } else {
    return (
        <div className="blog">
            {blog.likes} |  {blog.title} {blog.author} <button onClick={toggle}>view</button>
        </div>
    )
  }

}

export default Blog