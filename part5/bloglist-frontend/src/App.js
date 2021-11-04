import React, { useEffect, useState } from 'react'
import blogService from './services/blogs'
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import BlogList from "./components/BlogList";
import UserInfo from "./components/UserInfo";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification";


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState({})

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

        try {
            const user = await loginService.login({ username, password });
            if (user) {
                window.localStorage.setItem('userData', JSON.stringify(user))
                setUser(user)
                setUsername('')
                setPassword('')
            }
        } catch (error) {
            setDisposableNotification({
                success: false,
                message: 'wrong username or password'
            })
        }
    }

    const onLogout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('userData')
        setUser(null)
    }

    const setDisposableNotification = (notification) => {
        setNotification(notification)
        setTimeout(() => setNotification({}), 5000)
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
            const createdBlog = await blogService.createBlog({ title, url, author }, user.token)
            const updatedBlogs = blogs.concat(createdBlog)
            setBlogs(updatedBlogs);

            setDisposableNotification({
                message: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
                success: true
            })

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
                <Notification data={notification} />
                <UserInfo user={user} logout={onLogout} />
                <CreateBlog blogFormDataHolder={blogFormDataHolder} />
                <BlogList blogs={blogs} />
            </>
        )
    } else {
        return (
            <>
                <h3>log in to application</h3>
                <Notification data={notification} />
                <LoginForm username={username} password={password} onSubmitLoginForm={onSubmitLoginForm}
                    onPasswordChange={onPasswordChange} onUsernameChange={onUsernameChange} />
            </>
        )
    }

}

export default App