import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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
  expect(
    screen.getByText(
      "Greetings! Welcome to Questify. Let's get you set up swiftly; it'll only take a few seconds to ensure you're ready to go."
    )
  ).toBeInTheDocument();

  expect(screen.getByText("Start")).toBeInTheDocument();
});

test("allows user to progress through the form steps", async () => {
  render(<Form />);
  fireEvent.click(screen.getByText("Start"));
  await screen.findByText("Question 1");
  expect(screen.getByText("Question 1")).toBeInTheDocument();
  expect(screen.getByText("What's your name?")).toBeInTheDocument();
  expect(screen.getByText("Fill with your full name.")).toBeInTheDocument();

  const nameInput = screen.getByPlaceholderText(
    "Your answer here"
  ) as HTMLInputElement;
  fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
  fireEvent.click(screen.getByText("Next"));

  await screen.findByText("Question 2");
  expect(screen.getByText("Question 2")).toBeInTheDocument();
  expect(screen.getByText("What's your gender?")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Female"));

  expect(screen.getByText("When were you born?")).toBeInTheDocument();
  const birthDateMock = new Date(2003, 4, 21);
  const birthDateInput = screen.getByPlaceholderText(
    "DD/MM/YYYY"
  ) as HTMLInputElement;
  fireEvent.change(birthDateInput, { target: { value: birthDateMock } });

  expect(screen.getByText("Phone Number?")).toBeInTheDocument();
  const phoneNumberInput = screen.getByPlaceholderText(
    "Your number here"
  ) as HTMLInputElement;
  fireEvent.change(phoneNumberInput, { target: { value: "1234567890" } });

  fireEvent.click(screen.getByText("Next"));

  await screen.findByText("Ending");
});
