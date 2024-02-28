import UserInfo from "@/app/user-info/page";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "@/components/user-info/Form";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe("UserInfo", () => {
  it("renders without crashing", async () => {
    render(await UserInfo());

    const headingElement = screen.getByRole("heading", { name: /User Info/i });
    expect(headingElement).toBeInTheDocument();
  });
});

//   it("renders register if fetch succeds", async () => {
