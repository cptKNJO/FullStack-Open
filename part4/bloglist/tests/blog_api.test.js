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

describe("when there is initially some blogs saved", () => {
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

  describe("adding blog", () => {
    test("a blog with valid data can be created", async () => {
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

    test("adding blogs with missing likes property defaults to 0", async () => {
      const newBlog = {
        title: "Not liked blog",
        author: "Captain",
        url: "http://localhost:3003"
      };

      const response = await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);

      expect(response.body.likes).toBeDefined();
      expect(response.body.likes).toBe(0);
    });

    test("blog with missing title and url fails with status code 400", async () => {
      const newBlog = {
        url: "http://localhost:3003"
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(400);
    });
  });

  describe("viewing a specific blog", () => {
    test("succeeds with a valid id", async () => {
      const blogsAtStart = await helper.blogsInDb();

      const blogToView = blogsAtStart[0];

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(resultBlog.body.content).toEqual(blogToView.content);
    });

    test("fails with statuscode 404 if note does not exist", async () => {
      const validNonexistingId = await helper.nonExistingId();

      console.log(validNonexistingId);

      await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
    });

    test("fails with statuscode 400 id is invalid", async () => {
      const invalidId = "5a3d5da59070081a82a3445";

      await api.get(`/api/blogs/${invalidId}`).expect(400);
    });
  });

  describe("deletion of a blog", () => {
    test("succeeds with status code 204 with a valid id", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1);

      const contents = blogsAtEnd.map(b => b.title);
      expect(contents).not.toContain(blogToDelete.title);
    });
  });

  describe("update likes of a specific blog", () => {
    test("succeeds with a valid id", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];
      const startLikes = blogToUpdate.likes;

      const newBlogLikes = {
        likes: startLikes + 10
      };

      const resultBlog = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(newBlogLikes)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(resultBlog.body.likes).toBe(newBlogLikes.likes);
    });

    test("fails with statuscode 404 if blog does not exist", async () => {
      const validNonexistingId = await helper.nonExistingId();
      const newBlog = {
        likes: 999
      };

      console.log(validNonexistingId);

      await api
        .put(`/api/blogs/${validNonexistingId}`)
        .send(newBlog)
        .expect(404);
    });

    test("fails with statuscode 400 id is invalid", async () => {
      const invalidId = "5a3d5da59070081a82a3445";
      const newBlog = {
        likes: 999
      };

      await api
        .put(`/api/blogs/${invalidId}`)
        .send(newBlog)
        .expect(400);
    });
  });
});

afterAll(async () => {
  mongoose.connection.close();
});
