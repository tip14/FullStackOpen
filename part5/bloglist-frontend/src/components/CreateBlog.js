const CreateBlog = ({blogFormDataHolder}) => {

    const {title, author, url} = blogFormDataHolder;
    const {onTitleChange, onAuthorChange, onUrlChange, saveBlog} = blogFormDataHolder;

    return (
        <form>
            <h2>create new</h2>
            <p>title: <input type="text" value={title} onChange={onTitleChange}/></p>
            <p>author: <input type="text" value={author} onChange={onAuthorChange}/></p>
            <p>url: <input type="text" value={url} onChange={onUrlChange}/></p>
            <p><button onClick={saveBlog}>create</button></p>
        </form>
    )

}

export default CreateBlog