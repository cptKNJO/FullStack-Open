import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SimpleBlog from "./SimpleBlog";

describe("<SimpleBlog />", () => {
  const blog = {
    title: "Testing component with react-testing-library",
    author: "Tester",
    likes: 100
  };

  test("renders title, author, and likes", () => {
    const component = render(<SimpleBlog blog={blog} />);

    const title = component.container.querySelector(".title");
    const author = component.container.querySelector(".author");
    const likes = component.container.querySelector(".likes");

    expect(author).toHaveTextContent("Tester");
    expect(title).toHaveTextContent(
      "Testing component with react-testing-library"
    );
    expect(likes).toHaveTextContent("100 likes");
  });

  test("clicking the button twice calls the event handler twice", () => {
    const mockHandler = jest.fn();

    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    );

    const button = getByText("like");
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls.length).toBe(2);
  });
});
