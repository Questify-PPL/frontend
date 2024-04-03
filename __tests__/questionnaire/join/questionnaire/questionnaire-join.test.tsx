import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import QuestionnaireJoin from "@/app/(protected)/questionnaire/join/questionnaire/page";

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

test("renders the first step of the form", () => {
  render(<QuestionnaireJoin />);

  const titleElements = screen.getAllByText(
    "Oreo Satisfaction: User Feedback in Indonesia",
  );
  expect(titleElements).toHaveLength(2);

  expect(screen.getByText("Opening")).toBeInTheDocument();
  expect(
    screen.getByText(
      "Hello! I'm Ruben. I'm a Scientist at Oreo. Through this questionnaire I'd like to know consumer's preferences for Oreo flavors and packaging.",
    ),
  ).toBeInTheDocument();

  expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
});

test("allows user to progress through the form steps", async () => {
  render(<QuestionnaireJoin />);
  fireEvent.click(screen.getByText("Start"));
  await screen.findByText("Question 1");
  expect(screen.getByText("Question 1")).toBeInTheDocument();

  const questionTexts = screen.getAllByText(
    "Have you ever bought Oreo Special Edition?",
  );
  expect(questionTexts.length).toBeGreaterThan(0); // Ensure we found the elements
  questionTexts.forEach((text) => {
    expect(text).toBeInTheDocument();
  });

  const yesNoRadioButton = screen.getByLabelText("Yes") as HTMLInputElement;
  fireEvent.click(yesNoRadioButton);

  const nameInput = screen.getByPlaceholderText(
    "Your answer here",
  ) as HTMLInputElement;
  fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
  fireEvent.click(screen.getByText("Next"));

  await screen.findByText("Question 2");
  expect(screen.getByText("Question 2")).toBeInTheDocument();
  expect(
    screen.getByText(
      "From the list below, which Oreo Special Edition have you ever seen in supermarkets?",
    ),
  ).toBeInTheDocument();

  const editions = [
    "Oreo Chinese New Year Edition",
    "Oreo Eid Edition",
    "Oreo President Election Edition",
    "Oreo Valentine's Day Edition",
  ];

  editions.forEach(async (edition) => {
    const checkbox = await screen.findByLabelText(edition);
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  fireEvent.click(screen.getByText("Next"));
  await screen.findByText("Ending");

  expect(screen.getByText("Ending")).toBeInTheDocument();
  expect(
    screen.getByText(
      "Thank you for participating! Your insights are valuable. I hope you don't mind joining future questionnaires.",
    ),
  ).toBeInTheDocument();
  expect(screen.getByText("Submit")).toBeInTheDocument();

  const submitButton = screen.getByText("Submit") as HTMLButtonElement;
  fireEvent.click(submitButton);

  await screen.findByText("Done and Dusted");

  const okButton = screen.getByText("OK") as HTMLButtonElement;
  fireEvent.click(okButton);

  expect(push).toHaveBeenCalledWith("../");
});
