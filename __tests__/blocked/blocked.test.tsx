import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlockedPage from "@/app/(protected)/blocked/page";

describe("BlockedPage", () => {
  test("renders blocked message correctly", () => {
    render(<BlockedPage />);

    const blockedHeading = screen.getByText("Blocked!");
    const contactEmail = screen.getByText("questifyst.official@gmail.com");

    expect(blockedHeading).toBeInTheDocument();
    expect(contactEmail).toBeInTheDocument();
  });
});
