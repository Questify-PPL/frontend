import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdditionalInfo from "@/app/(protected)/additional-info/page";

jest.mock("next/navigation", () => {
  return { useRouter: jest.fn(), useSearchParams: jest.fn() };
});

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

test("renders the first step of the form", () => {
  render(<AdditionalInfo />);

  expect(screen.getByText("User Additional Information")).toBeInTheDocument();
  expect(screen.getByText("Opening")).toBeInTheDocument();
  expect(
    screen.getByText(
      "Greetings! Welcome to Questify. Let's get you set up swiftly; it'll only take a few seconds to ensure you're ready to go.",
    ),
  ).toBeInTheDocument();

  expect(screen.getByText("Start")).toBeInTheDocument();
});

test("allows user to progress through the form steps", async () => {
  render(<AdditionalInfo />);
  fireEvent.click(screen.getByText("Start"));
  await screen.findByText("Question 1");
  expect(screen.getByText("Question 1")).toBeInTheDocument();
  expect(screen.getByText("What's your name?")).toBeInTheDocument();
  expect(screen.getByText("Fill with your full name.")).toBeInTheDocument();

  const nameInput = screen.getByPlaceholderText(
    "Your answer here",
  ) as HTMLInputElement;
  fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
  fireEvent.click(screen.getByText("Next"));

  await screen.findByText("Question 2");
  expect(screen.getByText("Question 2")).toBeInTheDocument();
  expect(screen.getByText("What's your gender?")).toBeInTheDocument();
  const genderRadioButton = screen.getByLabelText("Male") as HTMLInputElement;
  fireEvent.click(genderRadioButton);

  expect(screen.getByText("When were you born?")).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText("DD/MM/YYYY"), {
    target: { value: "21042003" },
  });

  expect(screen.getByText("Phone Number")).toBeInTheDocument();
  const phoneNumberInput = screen.getByPlaceholderText(
    "Your number here",
  ) as HTMLInputElement;
  fireEvent.change(phoneNumberInput, { target: { value: "1234567890" } });

  const companyNameInput = screen.getByPlaceholderText(
    "Your company name here",
  ) as HTMLInputElement;
  fireEvent.change(companyNameInput, { target: { value: "Questify" } });

  fireEvent.click(screen.getByText("Next"));

  await screen.findByText("Ending");

  expect(screen.getByText("Ending")).toBeInTheDocument();
  expect(
    screen.getByText("All set! Let's jump into the workspace."),
  ).toBeInTheDocument();
  expect(screen.getByText("Finish")).toBeInTheDocument();
});
