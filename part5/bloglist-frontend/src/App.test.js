import React from "react";
import { render, waitForElement } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
jest.mock("./services/blogs");
import App from "./App";

describe("<App />", () => {
  test("if no user logged, blogs are not rendered", async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText("login"));

    // expectations here
    const blog = component.container.querySelector(".blog");
    expect(blog).toBeNull();

    const inputs = component.container.querySelectorAll("input");
    expect(inputs.length).toBe(2);

    const button = component.getByText("login");
    expect(button).toBeDefined();
  });

  test("if user logged in, blogs are rendered", async () => {
    const user = {
      username: "tester",
      token: "1231231214",
      name: "Donald Tester"
    };

    localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

    const component = render(<App />);
    component.rerender(<App />);

    // expectations
    await waitForElement(() => component.container.querySelectorAll(".blog"));

    const blogs = component.container.querySelectorAll(".blog");
    expect(blogs.length).toBe(3);

    expect(component.container).toHaveTextContent("Testing blog");
    expect(component.container).toHaveTextContent("Testing another blog");
    expect(component.container).toHaveTextContent("Example test");
  });
});
