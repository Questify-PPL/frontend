import React from "react";
import { render, screen, fireEvent, findByText } from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "@/components/additional-info/Form";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

test("renders the first step of the form", () => {
  render(<Form />);

  expect(screen.getByText("User Additional Information")).toBeInTheDocument();
  expect(screen.getByText("Opening")).toBeInTheDocument();
  expect(screen.getByText("Greetings! Welcome to Questify. Let's get you set up swiftly; it'll only take a few seconds to ensure you're ready to go.")).toBeInTheDocument();

  expect(screen.getByText("Start")).toBeInTheDocument();
});
