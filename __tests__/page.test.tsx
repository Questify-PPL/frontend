import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "@/app/page";

describe("Page", () => {
  it("renders without crashing", () => {
    render(<Page />);
    const text = screen.getByText("This is Questify Staging");

    expect(text).toBeInTheDocument();
  });
});
