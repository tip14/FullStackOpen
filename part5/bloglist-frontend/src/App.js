import React, {useEffect, useState} from 'react'
import blogService from './services/blogs'
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import BlogList from "./components/BlogList";

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
            setUser(user)
            setUsername('')
            setPassword('')
        }

    }

    if (user) {
        return <BlogList blogs={blogs} user={user} />
    } else {
        return <LoginForm username={username} password={password} onSubmitLoginForm={onSubmitLoginForm}
                   onPasswordChange={onPasswordChange} onUsernameChange={onUsernameChange}/>
    }

}

export default App