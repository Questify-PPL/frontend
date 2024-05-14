import TopUp from "@/app/(protected)/topup/page";
import { getInvoiceCreator } from "@/lib/action/topup";
import "@testing-library/jest-dom"; // Import this to extend Jest's expect capabilities
import { render, screen } from "@testing-library/react";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock("@/lib/action/topup", () => ({
  getInvoiceCreator: jest.fn(),
  processTopUp: jest.fn(),
}));

jest.mock("next/navigation", () => {
  return { useRouter: jest.fn(), usePathname: jest.fn() };
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock("@/auth", () => {
  return {
    __esModule: true,
    auth: jest.fn(),
  };
});

describe("TopUp component", () => {
  describe("TopUp component", () => {
    beforeEach(async () => {
      (getInvoiceCreator as jest.Mock).mockReturnValue({
        data: [
          {
            id: "0446aab7-cf2e-447c-9170-5161652b11fc",
            creatorId: "97aea076-70da-44ba-8ea7-76de54dbc8d9",
            creatorName: "Creator Questify",
            amount: 100000,
            status: "PENDING",
            buktiPembayaranUrl:
              "http://res.cloudinary.com/dernvq1rj/image/upload/v1713796033/bukti_bayar/Questify.png.png",
            createdAt: "2024-04-22T14:27:14.304Z",
            validatedAt: null,
            payment: "BCA",
            exchange: "Top Up",
            accountNumber: null,
          },
          {
            id: "068b11a1-e45b-4f81-9ea2-71368cf7bdfa",
            creatorId: "97aea076-70da-44ba-8ea7-76de54dbc8d9",
            creatorName: "Creator Questify",
            amount: 10000,
            status: "PENDING",
            buktiPembayaranUrl:
              "http://res.cloudinary.com/dernvq1rj/image/upload/v1713795527/bukti_bayar/bangkit.png.png",
            createdAt: "2024-04-22T14:18:48.317Z",
            validatedAt: null,
            payment: "BCA",
            exchange: "Top Up",
            accountNumber: null,
          },
          {
            id: "2f3f89b8-5057-4832-94ad-636ed5458068",
            creatorId: "97aea076-70da-44ba-8ea7-76de54dbc8d9",
            creatorName: "Creator Questify",
            amount: 120000,
            status: "PENDING",
            buktiPembayaranUrl:
              "http://res.cloudinary.com/dernvq1rj/image/upload/v1711261261/bukti_bayar/Untitled%20Diagram.drawio.png.png",
            createdAt: "2024-04-22T13:47:44.699Z",
            validatedAt: null,
            payment: "BCA",
            exchange: "Top Up",
            accountNumber: null,
          },
          {
            id: "b836f989-3424-4c43-af9b-982981ac67fd",
            creatorId: "97aea076-70da-44ba-8ea7-76de54dbc8d9",
            creatorName: "Creator Questify",
            amount: 20000,
            status: "PENDING",
            buktiPembayaranUrl:
              "http://res.cloudinary.com/dernvq1rj/image/upload/v1711261261/bukti_bayar/Untitled%20Diagram.drawio.png.png",
            createdAt: "2024-04-22T06:41:24.881Z",
            validatedAt: null,
            payment: "BCA",
            exchange: "Top Up",
            accountNumber: null,
          },
        ],
      });

      render(await TopUp());
    });

    it("renders top up section correctly", () => {
      const topupText = screen.getByText("Credit Top Up");
      const amountText = screen.getByText("Enter top up amount");

      expect(topupText).toBeInTheDocument();
      expect(amountText).toBeInTheDocument();
    });

    it("renders topup history section correctly", () => {
      const topupHistoryText = screen.getByText("Top Up History");
      const topupMadeText = screen.getByText("Top up you have made");

      expect(topupHistoryText).toBeInTheDocument();
      expect(topupMadeText).toBeInTheDocument();
    });

    it("renders InfoTable component", () => {
      const infoTableElement = screen.getByText(/Top Up History/i);
      expect(infoTableElement).toBeInTheDocument();
    });
  });
});
