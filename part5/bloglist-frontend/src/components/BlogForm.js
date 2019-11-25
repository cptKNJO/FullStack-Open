import React from "react";

const BlogForm = ({ onSubmit, title, author, url }) => {
  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={onSubmit}>
        <div>
          title:
          <input
            {...title}
          />
        </div>
        <div>
          author:
          <input
            {...author}
          />
        </div>
        <div>
          url:
          <input
            {...url}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
