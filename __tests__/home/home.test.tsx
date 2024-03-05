import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/home/page";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock("next/navigation", () => {
  return { useRouter: jest.fn() };
});

test("renders home page with no problem", () => {
  render(<Home />);

  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Create QRE")).toBeInTheDocument();
  expect(screen.getByText("Responses")).toBeInTheDocument();

  expect(screen.getByText("empty forms")).toBeInTheDocument();
  expect(screen.getByText("credits")).toBeInTheDocument();
});
