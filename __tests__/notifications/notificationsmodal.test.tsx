import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import NotificationModal from "@/components/notification/NotificationModal";

describe("NotificationModal", () => {
  test("renders modal when isOpen is true", () => {
    const { getByTestId } = render(
      <NotificationModal isOpen={true} onClose={() => {}} />
    );
    const modal = getByTestId("notification-modal");
    expect(modal).toBeInTheDocument();
  });

  test("does not render modal when isOpen is false", () => {
    const { queryByTestId } = render(
      <NotificationModal isOpen={false} onClose={() => {}} />
    );
    const modal = queryByTestId("notification-modal");
    expect(modal).not.toBeInTheDocument();
  });

  test("calls onClose when OK button is clicked", () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(
      <NotificationModal isOpen={true} onClose={onCloseMock} />
    );
    const okButton = getByText("OK");
    fireEvent.click(okButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
