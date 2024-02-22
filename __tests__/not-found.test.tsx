import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NotFoundPage from "@/app/not-found";

describe("NotFoundPage", () => {
  it("should render the 404 page", () => {
    render(<NotFoundPage />);
    expect(
      screen.getByText("Sorry, the page you are looking for is not found."),
    ).toBeInTheDocument();
  });
});
