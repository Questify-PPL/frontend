import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TopUpInfoTable from "@/components/topup/TopUpInfoTable";

describe("InfoTable", () => {
  test("renders item and date labels", () => {
    render(<TopUpInfoTable invoiceItems={[]} />);

    // Assert that the "Item" label is rendered
    const itemLabel = screen.getByText(/Credit/i);
    expect(itemLabel).toBeInTheDocument();

    // Assert that the "Date" label is rendered
    const dateLabel = screen.getByText(/Date/i);
    expect(dateLabel).toBeInTheDocument();

    // Assert that the "Status" label is rendered
    const statusLabel = screen.getByText(/Status/i);
    expect(statusLabel).toBeInTheDocument();
  });
});
