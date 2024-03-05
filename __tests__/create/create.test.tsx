import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Create from "@/app/create/page";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock("next/navigation", () => {
  return { useRouter: jest.fn() };
});

test("renders navigation pane with no problem", () => {
  render(<Create />);

  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Create")).toBeInTheDocument();
  expect(screen.getByText("Responses")).toBeInTheDocument();
});
