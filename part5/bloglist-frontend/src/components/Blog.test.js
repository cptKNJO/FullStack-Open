import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

describe("<Blog />", () => {
  const blog = {
    title: "Testing blog",
    author: "Tester",
    url: "https://www.someRandomUrl.com",
    likes: 99,
    user: {
      username: "Testing User"
    }
  };

  const user = {
    username: "Testing User"
  };

  let component;

  beforeEach(() => {
    component = render(<Blog blog={blog} user={user} />);
  });

  test("renders component", () => {
    const div = component.container.querySelector("div");
    expect(div).toBeDefined();
  });

  test("at first, details other than title and author are not displayed", () => {
    const summary = component.container.querySelector(".summary");
    expect(summary).not.toHaveStyle("display: none");

    const div = component.container.querySelector(".details");
    expect(div).toHaveStyle("display: none");
  });

  test("after clicking, all information is displayed", () => {
    const summary = component.container.querySelector(".summary");
    fireEvent.click(summary);

    const div = component.container.querySelector(".details");
    expect(div).not.toHaveStyle("display: none");
  });
});
