import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "@/app/page";

describe("Page", () => {
  it("renders the hero section", () => {
    render(<Page />);
    const text = screen.getByText(/Empower academic communities engagement/i);
    const button = screen.getByText(/Get Started/i);

    expect(text).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("renders the end section", () => {
    render(<Page />);
    const text = screen.getByText(
      /Unlock academic success with our streamlined form builder and distributor/i,
    );
    const button = screen.getByText(/Sign Up/i);

    expect(text).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
