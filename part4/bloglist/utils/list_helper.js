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

  const reducer = (mostLiked, current) => (
    mostLiked.likes > current.likes ? mostLiked : current
  );
  let mostLiked = blogs.reduce(reducer, blogs[0]);
  delete mostLiked._id;
  delete mostLiked.url;
  delete mostLiked.__v;
  return mostLiked;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
};
