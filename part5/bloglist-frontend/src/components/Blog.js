import React, {useState} from 'react'
const Blog = ({blog}) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggle = () => setShowDetails(!showDetails)

  if (showDetails) {
    return (
        <div className="blog">
          <p>{blog.title} <button onClick={toggle}>hide</button></p>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button>like</button></p>
          <p>{blog.title}</p>
        </div>
    )
  } else {
    return (
        <div className="blog">
          {blog.title} {blog.author} <button onClick={toggle}>view</button>
        </div>
    )
  }

}

export default Blog