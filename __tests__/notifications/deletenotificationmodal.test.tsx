import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import DeleteNotificationModal from "@/components/notification/DeleteNotificationModal";

describe("NotificationModal", () => {
  test("renders modal when isOpen is true", () => {
    const { getByTestId } = render(
      <DeleteNotificationModal isOpen={true} onClose={() => {}} />,
    );
    const modal = getByTestId("delete-modal");
    expect(modal).toBeInTheDocument();
  });

  test("does not render modal when isOpen is false", () => {
    const { queryByTestId } = render(
      <DeleteNotificationModal isOpen={false} onClose={() => {}} />,
    );
    const modal = queryByTestId("delete-modal");
    expect(modal).not.toBeInTheDocument();
  });
});
