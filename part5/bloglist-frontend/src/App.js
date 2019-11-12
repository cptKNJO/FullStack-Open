import React, { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessasge] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: ""
  });

  useEffect(() => {
    async function getBlogs() {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    }
    getBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessasge("Wrong credentials");
      setTimeout(() => {
        setErrorMessasge(null);
      }, 5000);
    }
  };

  const handleLogout = event => {
    event.preventDefault();
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const addBlog = async event => {
    event.preventDefault();

    const newObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url
    };

    const newBlog = await blogService.create(newObject);
    setBlogs(blogs.concat(newBlog));
    setBlog({
      title: "",
      author: "",
      url: ""
    });
  };

  return (
    <div className="App">
      <Notification message={errorMessage} />

      {user === null ? (
        <LoginForm
          onSubmit={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <div>
          <h2>Blogs</h2>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
          <br></br>
          <br></br>
          <BlogForm onSubmit={addBlog} blog={blog} setBlog={setBlog} />
          <br></br>
          <br></br>
          <div>
            {blogs.map(blog => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
