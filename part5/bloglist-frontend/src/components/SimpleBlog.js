import React from "react";

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div>
      <span className="title">{blog.title}</span>{" "}
      <span className="author">{blog.author}</span>
    </div>
    <div className="likes">
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
);

export default SimpleBlog;
