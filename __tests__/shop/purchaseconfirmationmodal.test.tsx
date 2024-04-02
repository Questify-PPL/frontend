import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import this to extend Jest's expect capabilities

import PurchaseConfirmationModal from "@/components/shop/PurchaseConfirmationModal";

describe("PurchaseConfirmationModal component", () => {
  it("renders the modal when isOpen is true", () => {
    render(<PurchaseConfirmationModal isOpen={true} onClose={() => {}} />);

    const modalElement = screen.getByTestId("purchased-confirmation-modal");

    expect(modalElement).toBeInTheDocument();
  });

  it("does not render the modal when isOpen is false", () => {
    render(<PurchaseConfirmationModal isOpen={false} onClose={() => {}} />);

    const modalElement = screen.queryByTestId("purchased-confirmation-modal");

    expect(modalElement).not.toBeInTheDocument();
  });

  it('calls onClose when "Yes" button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<PurchaseConfirmationModal isOpen={true} onClose={onCloseMock} />);

    const yesButton = screen.getByText("Yes");
    fireEvent.click(yesButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when "No" button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<PurchaseConfirmationModal isOpen={true} onClose={onCloseMock} />);

    const noButton = screen.getByText("No");
    fireEvent.click(noButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
