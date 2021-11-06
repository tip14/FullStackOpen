import React, { useState } from 'react'

const CreateBlog = ({ saveBlog }) => {

    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [author, setAuthor] = useState('');

    const onTitleChange = (e) => setTitle(e.target.value)
    const onAuthorChange = (e) => setAuthor(e.target.value)
    const onUrlChange = (e) => setUrl(e.target.value)

    const addBlog = (e) => {
        e.preventDefault()
        saveBlog({ title, url, author })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={addBlog}>
            <h2>create new</h2>
            <p>title: <input type="text" value={title} onChange={onTitleChange}/></p>
            <p>author: <input type="text" value={author} onChange={onAuthorChange}/></p>
            <p>url: <input type="text" value={url} onChange={onUrlChange}/></p>
            <p>
                <button type="submit">create</button>
            </p>
        </form>
    )

}

export default CreateBlog