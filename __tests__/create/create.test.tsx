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

test("renders navigation pane with no problem", async () => {
  render(await Create());

  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Create")).toBeInTheDocument();
  expect(screen.getByText("Responses")).toBeInTheDocument();
});

test("renders main feature and open the modal", async () => {
  render(await Create());

  const createButton = screen.getByText(
    "Create a new Questionnaire",
  ) as HTMLButtonElement;
  fireEvent.click(createButton);

  await screen.findByText("Give the Questionnaire what it needs first :)");
});

test("open then close (cancel) the modal", async () => {
  render(await Create());

  const createButton = screen.getByText(
    "Create a new Questionnaire",
  ) as HTMLButtonElement;
  fireEvent.click(createButton);

  await screen.findByText("Give the Questionnaire what it needs first :)");

  const cancelButton = screen.getByText("Cancel") as HTMLButtonElement;
  fireEvent.click(cancelButton);
});

test("fill the required create modal successfully", async () => {
  render(await Create());

  const createButton = screen.getByText(
    "Create a new Questionnaire",
  ) as HTMLButtonElement;
  fireEvent.click(createButton);

  await screen.findByText("Give the Questionnaire what it needs first :)");

  // const titleInput = screen.getByPlaceholderText(
  //   "Give your Questionnaire a title"
  // ) as HTMLInputElement;
  // fireEvent.change(titleInput, {
  //   target: { value: "Oreo Satisfaction: User Feedback in Indonesia " },
  // });

  // expect(screen.getByText("Prize")).toBeInTheDocument();

  // const prizeInput = screen.getByPlaceholderText(
  //   "Decide your prize Credits"
  // ) as HTMLInputElement;
  // fireEvent.change(prizeInput, { target: { value: "1000" } });

  // expect(screen.getByText("for each responder")).toBeInTheDocument();
  // fireEvent.click(screen.getByText("for each responder"));
});
