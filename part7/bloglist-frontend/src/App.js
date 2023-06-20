import React, { useEffect, useRef, useState } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import BlogList from "./components/BlogList";
import UserInfo from "./components/UserInfo";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({});

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userDataString = window.localStorage.getItem("userData");
    if (userDataString) {
      setUser(JSON.parse(userDataString));
    }
  }, []);

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitLoginForm = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      if (user) {
        window.localStorage.setItem("userData", JSON.stringify(user));
        setUser(user);
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      setDisposableNotification({
        success: false,
        message: "wrong username or password",
      });
    }
  };

  const onLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("userData");
    setUser(null);
  };

  const setDisposableNotification = (notification) => {
    setNotification(notification);
    setTimeout(() => setNotification({}), 5000);
  };

  const createBlogRef = useRef();

  const saveBlog = async (newBlog) => {
    const createdBlog = await blogService.createBlog(newBlog, user.token);
    const updatedBlogs = blogs.concat(createdBlog);
    setBlogs(updatedBlogs);

    createBlogRef.current.toggle();

    setDisposableNotification({
      message: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
      success: true,
    });
  };

  const addLike = async (blog) => {
    const blogWithAddedLike = { ...blog, likes: blog.likes + 1 };
    const updatedBlog = await blogService.updateBlog(
      blogWithAddedLike,
      user.token
    );

    const blogsWithUpdated = blogs.map((b) => {
      if (b.id === updatedBlog.id) {
        b.likes = updatedBlog.likes;
      }
      return b;
    });

    setBlogs(blogsWithUpdated);
  };

  const removeBlog = async (blog) => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    if (confirm) {
      await blogService.deleteBlog(blog.id, user.token);
      const updatedBlogs = blogs.filter((b) => b.id !== blog.id);
      setBlogs(updatedBlogs);
      setDisposableNotification({
        message: `Blog ${blog.title} by ${blog.author} was removed`,
        success: true,
      });
    }
  };

  if (user) {
    return (
      <>
        <h2>blogs</h2>
        <Notification data={notification} />
        <UserInfo user={user} logout={onLogout} />
        <Togglable buttonLabel="create new blog" ref={createBlogRef}>
          <CreateBlog saveBlog={saveBlog} />
        </Togglable>
        <BlogList blogs={blogs} addLike={addLike} removeBlog={removeBlog} />
      </>
    );
  } else {
    return (
      <>
        <h3>log in to application</h3>
        <Notification data={notification} />
        <LoginForm
          username={username}
          password={password}
          onSubmitLoginForm={onSubmitLoginForm}
          onPasswordChange={onPasswordChange}
          onUsernameChange={onUsernameChange}
        />
      </>
    );
  }
};

export default App;
