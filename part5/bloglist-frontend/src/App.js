import React, { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";
import Toggleable from "./components/Toggleable";
import { useField } from "./hooks/index";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const username = useField("text");
  const password = useField("password");
  const [user, setUser] = useState(null);
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

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

  const loginForm = () => {
    return (
      <LoginForm
        handleSubmit={handleLogin}
        username={username.input}
        password={password.input}
      />
    );
  };

  const addBlog = async event => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();

    const newObject = {
      title: title.input.value,
      author: author.input.value,
      url: url.input.value,
      likes: 0
    };

    const newBlog = await blogService.create(newObject);
    setSuccessMessage(`A new blog "${title.value}" by ${author.value} added`);

    setBlogs(blogs.concat(newBlog));
    title.reset();
    author.reset();
    url.reset();

    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const blogFormRef = React.createRef();

  const blogForm = () => {
    return (
      <Toggleable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm onSubmit={addBlog} title={title.input} author={author.input} url={url.input} />
      </Toggleable>
    );
  };

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.input.value,
        password: password.input.value
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      username.reset();
      password.reset();
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = event => {
    event.preventDefault();
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const changeLikes = async blogId => {
    const blog = blogs.find(b => b.id === blogId);

    const newBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1
    };

    const returnedBlog = await blogService.update(blog.id, newBlog);
    setBlogs(blogs.map(blog => (blog.id === blogId ? returnedBlog : blog)));
  };

  const handleDelete = async blogId => {
    // Only blog owners can delete them
    const blog = blogs.find(b => b.id === blogId);
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        const response = await blogService.remove(blogId);
        console.log(response);
        setBlogs(blogs.filter(b => b.id !== blogId));
        setSuccessMessage(`Deleted ${blog.title} by ${blog.author}.`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } catch (exception) {
        setErrorMessage("Only owner can delete.");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
  };

  return (
    <div className="App">
      <Notification error={errorMessage} success={successMessage} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>Blogs</h2>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
          <br></br>
          <br></br>
          {blogForm()}
          <br></br>
          <br></br>
          <div>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  changeLikes={() => changeLikes(blog.id)}
                  handleDelete={() => handleDelete(blog.id)}
                  user={user}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
