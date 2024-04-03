import React from "react";
import { render, screen } from "@testing-library/react";
import PurchaseCard from "@/components/shop/PurchaseCard";
import "@testing-library/jest-dom";

describe("PurchaseCard", () => {
  test("renders PurchaseCard component", () => {
    const props = {
      balance: 82000,
      promo: 2,
      price: 2000,
    };

    render(<PurchaseCard {...props} />);

    // Assert that the Credit Balance is rendered correctly
    const creditBalanceElement = screen.getByText(/Credit Balance/i);
    expect(creditBalanceElement).toBeInTheDocument();

    // Use getByText with selector option and regular expression
    const promoElement = screen.getByText(/2 promo\(s\) for you/i, {
      selector: "div",
    });
    expect(promoElement).toBeInTheDocument();

    // Assert that the Total section is rendered correctly
    const totalElement = screen.getByText(/Total/i);
    expect(totalElement).toBeInTheDocument();

    // Assert that the Purchase button is rendered correctly
    const purchaseButton = screen.getByRole("button", { name: /purchase/i });
    expect(purchaseButton).toBeInTheDocument();
  });
});
