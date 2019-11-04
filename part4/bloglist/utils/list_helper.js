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
  const authorBlogObj = _.countBy(blogs, "author");
  const authorBlogArr = Object.keys(authorBlogObj).map(author => {
    return {
      author: author,
      blogs: authorBlogObj[author]
    };
  });
  const reducer = (most, curr) => {
    return most.blogs > curr.blogs ? most : curr;
  };
  return authorBlogArr.reduce(reducer, {});
};

const mostLikes = blogs => {
  const authorLikesObj = _.countBy(blogs, "likes");
  console.log(authorLikesObj)
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
};
