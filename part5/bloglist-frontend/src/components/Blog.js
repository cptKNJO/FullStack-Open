import React, { useState } from "react";

const Blog = ({ blog, changeLikes, handleDelete, user }) => {
  const [showInfo, setShowInfo] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const showWhenVisible = { display: showInfo ? "" : "none" };

  return (
    <div className="blog" style={blogStyle}>
      <div className="summary" onClick={() => setShowInfo(!showInfo)}>
        <span className="title">{blog.title}</span>{" "}
        <span className="author">{blog.author}</span>
      </div>
      <div className="details" style={showWhenVisible}>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {blog.likes} likes
          <button onClick={changeLikes}>like</button>
        </div>
        <div>added by {blog.user ? blog.user.name : "Anonymous"}</div>
        {user.username === blog.user.username ? (
          <div>
            <button onClick={handleDelete}>remove</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Blog;
