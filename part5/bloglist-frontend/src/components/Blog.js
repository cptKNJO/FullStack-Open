import React, { useState } from "react";

const Blog = ({ blog, changeLikes }) => {
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
    <div style={blogStyle}>
      <div onClick={() => setShowInfo(!showInfo)}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenVisible}>
        <a href="#">{blog.url}</a>
        <div>
          {blog.likes} likes
          <button onClick={changeLikes}>like</button>
        </div>
        <div>added by {blog.user ? blog.user.name : "Anonymous"}</div>
      </div>
    </div>
  );
};

export default Blog;
