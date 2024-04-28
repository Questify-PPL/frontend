import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TopUpFinalCard from "@/components/topup/TopUpFinalCard";

describe("PurchasedModal component", () => {
  test("renders modal when isOpen is true", () => {
    const onCloseMock = jest.fn();
    render(<TopUpFinalCard isOpen={true} onClose={onCloseMock} />);

    // Check if the modal is rendered
    const modalElement = screen.getByTestId("final-topup-card");
    expect(modalElement).toBeInTheDocument();

    // Check if the "Purchased!" text is rendered
    const topUpText = screen.getByText("Top Up Process Started");
    expect(topUpText).toBeInTheDocument();

    // Check if the "OK" button is rendered
    const okButton = screen.getByText("OK");
    expect(okButton).toBeInTheDocument();

    // Simulate clicking the "OK" button
    fireEvent.click(okButton);

    // Check if the onClose function is called when the "OK" button is clicked
    expect(onCloseMock).toHaveBeenCalled();
  });
});
