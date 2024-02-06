import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "@/app/page";

describe("Page", () => {
  it("renders without crashing", () => {
    render(<Page />);

    const image = screen.getByAltText("Vercel Logo");
    const text = screen.getByText(/Get started by editing/);

    expect(image).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
