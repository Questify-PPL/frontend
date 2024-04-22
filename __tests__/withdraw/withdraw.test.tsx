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

jest.mock("@/lib/services/credit", () => {
  return {
    getUserCredit: jest.fn().mockResolvedValue(100000),
  };
});

jest.mock("@/lib/action/withdraw", () => {
  return {
    getWithdrawals: jest.fn().mockResolvedValue({
      data: [
        {
          id: 1,
          nominal: 10000,
          price: 13000,
          discount: 16000,
          createdAt: "2022-01-01",
        },
        {
          id: 2,
          nominal: 20000,
          price: 24000,
          discount: 30000,
          createdAt: "2022-01-02",
        },
      ],
    }),
    createWithdrawal: jest.fn(),
  };
});

describe("Withdraw Page", () => {
  it("should render Withdraw Page", async () => {
    render(await Withdraw());

    expect(
      screen.getByText("Choices of Withdraw Nominals"),
    ).toBeInTheDocument();
    expect(screen.getByText("Withdrawal History")).toBeInTheDocument();
  });
});

describe("Withdraw History", () => {
  it("should render Withdraw History", async () => {
    render(await Withdraw());
    expect(screen.getByText("Rp10000")).toBeInTheDocument();
    expect(screen.getByText("Rp20000")).toBeInTheDocument();
  });
});
