import Todo from "../ToDo";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Todo APP", () => {
  it("renders without crashing", () => {
    render(<Todo />);
  });

  it("should chane theme to light when clicked on Toggle Style button", () => {
    const { container } = render(<Todo />);
    const toggleButton = screen.getByText("Toggle Style");
    fireEvent.click(toggleButton);
    expect(container.querySelector("todo-container-light")).toBeDefined();
  });

  it("document should have ADD button", () => {
    const { getByText } = render(<Todo />);
    expect(getByText("ADD")).toBeInTheDocument();
  });

  it("Item List should not be in the document", () => {
    const { queryByText } = render(<Todo />);
    expect(queryByText("Item List")).toBeNull();
  });
});
