import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "@/app/create/form/page";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock("next/navigation", () => {
  return { useRouter: jest.fn() };
});

test("renders navigation pane with no problem", () => {
  render(<Form />);

  expect(screen.getByText("Opening")).toBeInTheDocument();
  expect(screen.getByText("Contents")).toBeInTheDocument();
  expect(screen.getByText("Ending")).toBeInTheDocument();

  expect(screen.getByText("Back")).toBeInTheDocument();
  expect(screen.getByText("Save as Draft")).toBeInTheDocument();

  expect(screen.getByText("Desktop")).toBeInTheDocument();
});

test("open the Opening section", async () => {
  render(<Form />);

  const createButton = screen.getByText("Opening") as HTMLButtonElement;
  fireEvent.click(createButton);

  await screen.findByText("1");
});

test("open the Contents section", async () => {
  render(<Form />);

  const createButton = screen.getByText("Contents") as HTMLButtonElement;
  fireEvent.click(createButton);

  await screen.findByText("Contents Children");
});

test("open the Ending section", async () => {
  render(<Form />);

  const createButton = screen.getByText("Ending") as HTMLButtonElement;
  fireEvent.click(createButton);

  await screen.findByText("Ending Children");
});
