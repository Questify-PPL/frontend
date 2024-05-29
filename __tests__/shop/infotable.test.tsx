import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ShopInfoTable } from "@/components/shop";

describe("InfoTable", () => {
  test("renders item and date labels", () => {
    render(<ShopInfoTable />);

    // Assert that the "Item" label is rendered
    const itemLabel = screen.getByText(/Item/i);
    expect(itemLabel).toBeInTheDocument();

    // Assert that the "Date" label is rendered
    const dateLabel = screen.getByText(/Date/i);
    expect(dateLabel).toBeInTheDocument();
  });
});
