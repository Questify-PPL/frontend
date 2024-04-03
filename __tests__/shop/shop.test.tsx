import Shop from "@/app/(protected)/shop/page"; // Assuming Shop component is in the correct path
import { getShopData } from "@/lib/action";
import "@testing-library/jest-dom"; // Import this to extend Jest's expect capabilities
import { render, screen } from "@testing-library/react";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock("@/lib/action/shop", () => ({
  getShopData: jest.fn(),
  processPurchase: jest.fn(),
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

describe("Shop component", () => {
  describe("Shop component", () => {
    beforeEach(async () => {
      (getShopData as jest.Mock).mockReturnValue({
        shopItems: [
          {
            id: 4,
            title: "1 Form",
            price: 25000,
            category: "BASIC_PLAN",
            advertisedOriginalPrice: 27000,
            description: "Get 1 Form",
          },
          {
            id: 5,
            title: "3 Forms",
            price: 70000,
            category: "BASIC_PLAN",
            advertisedOriginalPrice: 81000,
            description: "Get 3 Forms",
          },
          {
            id: 6,
            title: "5 Forms",
            price: 110000,
            category: "BASIC_PLAN",
            advertisedOriginalPrice: 135000,
            description: "Get 5 Forms",
          },
          {
            id: 7,
            title: "10 Forms",
            price: 200000,
            category: "BASIC_PLAN",
            advertisedOriginalPrice: 270000,
            description: "Get 10 Forms",
          },
        ],
        vouchers: [
          {
            id: "1",
            discount: 1000,
            expiredAt: "2024-12-31T00:00:00.000Z",
            isUsed: true,
            usedAt: "2024-04-03T18:52:52.759Z",
            userId: "4ec14456-88ed-41b0-b961-164e23506335",
            usedItemId: 7,
            createdAt: "2024-03-24T08:25:04.382Z",
            updatedAt: "2024-04-03T18:52:52.756Z",
          },
        ],
      });

      render(await Shop());
    });

    it("renders basic plans section correctly", () => {
      const basicPlansText = screen.getByText("Basic Plans");
      const formExpiryText = screen.getByText("The form has no expiry date");

      expect(basicPlansText).toBeInTheDocument();
      expect(formExpiryText).toBeInTheDocument();
    });

    it("renders purchase history section correctly", () => {
      const purchaseHistoryText = screen.getByText("Purchase History");
      const formsBoughtText = screen.getByText("Forms you have bought");

      expect(purchaseHistoryText).toBeInTheDocument();
      expect(formsBoughtText).toBeInTheDocument();
    });

    it("renders ItemCard components", () => {
      const cardElements = screen.getAllByTestId("item-card");
      expect(cardElements.length).toBe(4); // Assuming there are 4 ItemCard components rendered in Shop
    });

    it("renders InfoTable component", () => {
      const infoTableElement = screen.getByText(/Purchase History/i);
      expect(infoTableElement).toBeInTheDocument();
    });

    it("renders even though there is an error in fetching", async () => {
      (getShopData as jest.Mock).mockRejectedValue(new Error("error"));

      render(await Shop());

      const basicPlansText = screen.getAllByText("Basic Plans");
      const formExpiryText = screen.getAllByText("The form has no expiry date");

      expect(basicPlansText[0]).toBeInTheDocument();
      expect(formExpiryText[0]).toBeInTheDocument();
    });
  });
});
