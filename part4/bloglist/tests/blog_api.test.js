const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const Blog = require("../models/blog");
const app = require("../app");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("blogs are returned as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body.length).toBe(helper.initialBlogs.length);
});

test("blog object has a property called id", async () => {
  await api.get("/api/blogs");

  const blogs = await helper.blogsInDb();
  const blogToCheck = blogs[0];

  expect(blogToCheck.id).toBeDefined();
});

test("a blog can be created", async () => {
  const newBlog = {
    title: "A valid blog",
    author: "Captain",
    url: "http://localhost:3003",
    likes: 10
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);

  const contents = blogsAtEnd.map(b => b.title);
  expect(contents).toContain("A valid blog");
});

afterAll(async () => {
  mongoose.connection.close();
});
