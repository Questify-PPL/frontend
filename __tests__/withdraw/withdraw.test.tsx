import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Withdraw from "@/app/withdraw/page";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock("next/navigation", () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
      refresh: jest.fn(),
    }),
    usePathname: jest.fn(),
  };
});

describe("Withdraw", () => {
  it("should render Withdraw page", async () => {
    render(await Withdraw());
    const choices = screen.getByText("Choices of Withdraw Nominals");
    const history = screen.getByText("Withdrawal History");
    expect(choices).toBeInTheDocument();
    expect(history).toBeInTheDocument();
  });
});
