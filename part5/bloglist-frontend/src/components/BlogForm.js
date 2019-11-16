import React from "react";

const BlogForm = ({ onSubmit, blog, handleBlogChange }) => {
  const updateForm = event => {
    handleBlogChange({
      ...blog,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={onSubmit}>
        <div>
          title:
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={updateForm}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            value={blog.author}
            onChange={updateForm}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="url"
            value={blog.url}
            onChange={updateForm}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
