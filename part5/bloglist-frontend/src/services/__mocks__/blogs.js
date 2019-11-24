let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const blogs = [
  {
    title: "Testing blog",
    author: "Tester",
    url: "https://www.someRandomUrl.com",
    likes: 99,
    user: {
      username: "Testing User"
    }
  },
  {
    title: "Testing another blog",
    author: "Tester Tester",
    url: "https://www.someRandomUrl.com",
    likes: 0,
    user: {
      username: "Testing User"
    }
  },
  {
    title: "Example test",
    author: "Example Tester",
    url: "https://www.someRandomUrl.com",
    likes: 10,
    user: {
      username: "Testing User"
    }
  }
];

const getAll = () => {
  return Promise.resolve(blogs);
};

export default { getAll, setToken };
