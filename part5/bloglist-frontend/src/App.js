import React, {useEffect, useState} from 'react'
import blogService from './services/blogs'
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import BlogList from "./components/BlogList";
import UserInfo from "./components/UserInfo";
import CreateBlog from "./components/CreateBlog";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const userDataString = window.localStorage.getItem('userData');
        if (userDataString) {
            setUser(JSON.parse(userDataString))
        }
    }, []);

    const onUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const onSubmitLoginForm = async (event) => {
        event.preventDefault()
        const user = await loginService.login({username, password});
        if (user) {
            window.localStorage.setItem('userData', JSON.stringify(user))
            setUser(user)
            setUsername('')
            setPassword('')
        }
    }

    const onLogout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('userData')
        setUser(null)
    }


    /*
    Blog form
     */

    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [author, setAuthor] = useState('');

    const blogFormDataHolder = {
        title: title,
        url: url,
        author: author,
        onTitleChange: (e) => setTitle(e.target.value),
        onAuthorChange: (e) => setAuthor(e.target.value),
        onUrlChange: (e) => setUrl(e.target.value),
        saveBlog: async (e) => {
            e.preventDefault()
            const createdBlog = await blogService.createBlog({title, url, author}, user.token)
            const updatedBlogs = blogs.concat(createdBlog)
            setBlogs(updatedBlogs);

            setTitle('')
            setAuthor('')
            setUrl('')
        }
    }

    /*
    Blog form end
     */

    if (user) {
        return (
            <>
                <h2>blogs</h2>
                <UserInfo user={user} logout={onLogout}/>
                <CreateBlog blogFormDataHolder={blogFormDataHolder} />
                <BlogList blogs={blogs} />
            </>
        )
    } else {
        return <LoginForm username={username} password={password} onSubmitLoginForm={onSubmitLoginForm}
                   onPasswordChange={onPasswordChange} onUsernameChange={onUsernameChange}/>
    }

}

export default App