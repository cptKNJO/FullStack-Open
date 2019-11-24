import React from "react";
import { render } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import SimpleBlog from "./SimpleBlog";

describe("<SimpleBlog />", () => {
  const blog = {
    title: "Testing component with react-testing-library",
    author: "Tester",
    likes: 100
  };

  let component;

  beforeEach(() => {
    component = render(<SimpleBlog blog={blog} />);
  });

  test("renders title, author, and likes", () => {
    const title = component.container.querySelector(".title");
    const author = component.container.querySelector(".author");
    const likes = component.container.querySelector(".likes");
    console.log(prettyDOM(likes));

    expect(author).toHaveTextContent("Tester");
    expect(title).toHaveTextContent(
      "Testing component with react-testing-library"
    );
    expect(likes).toHaveTextContent("100 likes");
  });
});
