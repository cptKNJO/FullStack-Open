const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  // console.log(request.authorization, "blh");

  if (!(body.title && body.url)) {
    return response.status(400).send({ error: "no title and url" });
  }

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken) {
      return response.status(401).send({ error: "token missing or invalid" });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    const user = await User.findById(decodedToken.id);
    const blog = await Blog.findById(request.params.id);

    if (!(blog.user.toString() === user._id.toString())) {
      return response.status(401).send({ error: "wrong user deleting" });
    }

    await Blog.findByIdAndRemove(request.params.id);
    user.blogs = user.blogs.filter(
      blog => blog.toString() !== request.params.id
    );
    await user.save();
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const blog = {
    user: body.user,
    likes: body.likes,
    author: body.author,
    title: body.title,
    url: body.url
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    });

    if (updatedBlog) {
      const user = await User.findById(body.user);
      user.blogs = user.blogs.concat(updatedBlog._id);
      await user.save();

      const formattedBlog = await Blog.findById(updatedBlog.id).populate("user", {
        username: 1,
        name: 1
      });

      response.json(formattedBlog);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
