import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Join from "@/app/join/page";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const push = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
  }),
}));

test("renders navigation pane with no problem", () => {
  render(<Join />);

  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Questionnaire for You")).toBeInTheDocument();
  expect(screen.getByText("Responses")).toBeInTheDocument();
});

test("renders main feature and open the modal", async () => {
  render(<Join />);

  const createButton = screen.getByText(
    "Create a new Questionnaire",
  ) as HTMLButtonElement;
  fireEvent.click(createButton);

  await screen.findByText("See the details about this questionnaire");
});

test("open then close (cancel) the modal", async () => {
  render(<Join />);

  const createButton = screen.getByText(
    "Create a new Questionnaire",
  ) as HTMLButtonElement;
  fireEvent.click(createButton);

  await screen.findByText("See the details about this questionnaire");

  const cancelButton = screen.getByLabelText("Cancel");
  fireEvent.click(cancelButton);
});

test("can respond to the popup modal successfully", async () => {
  render(<Join />);

  const createButton = screen.getByText(
    "Create a new Questionnaire",
  ) as HTMLButtonElement;
  fireEvent.click(createButton);

  await screen.findByText("See the details about this questionnaire");

  expect(screen.getByText("Title")).toBeInTheDocument();
  expect(screen.getByText("Prize")).toBeInTheDocument();
  expect(screen.getByText("Estimated Time")).toBeInTheDocument();
  expect(
    screen.getByText("Creator will collect these data from you:"),
  ).toBeInTheDocument();

  const respondButton = screen.getByText("Respond") as HTMLButtonElement;
  fireEvent.click(respondButton);

  expect(push).toHaveBeenCalledWith("/join/questionnaire");
});
