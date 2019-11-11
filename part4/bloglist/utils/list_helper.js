var _ = require("lodash");

const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };
  return blogs.reduce(reducer, 0);
};

const favouriteBlog = blogs => {
  if (blogs.length === 0) return {};

  const reducer = (mostLiked, current) =>
    mostLiked.likes > current.likes ? mostLiked : current;
  let mostLiked = blogs.reduce(reducer, blogs[0]);
  delete mostLiked._id;
  delete mostLiked.url;
  delete mostLiked.__v;
  return mostLiked;
};

const mostBlogs = blogs => {
  const authorBlogsObj = _.countBy(blogs, "author");
  const authorBlogsArr = Object.keys(authorBlogsObj).map(author => {
    return {
      author: author,
      blogs: authorBlogsObj[author]
    };
  });
  const reducer = (most, curr) => {
    return most.blogs > curr.blogs ? most : curr;
  };
  return authorBlogsArr.reduce(reducer, {});
};

const mostLikes = blogs => {
  const authorLikes = {};
  blogs.forEach(blog => {
    if (!authorLikes.hasOwnProperty(blog.author)) {
      authorLikes[blog.author] = 0;
    }
    authorLikes[blog.author] += blog.likes;
  });
  const authorLikesArr = Object.keys(authorLikes).map(author => ({
    author: author,
    likes: authorLikes[author]
  }));
  return authorLikesArr.reduce(
    (most, curr) => (most.likes > curr.likes ? most : curr),
    {}
  );
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
};
