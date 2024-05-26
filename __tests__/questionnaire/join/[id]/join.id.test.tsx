import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { QuestionnaireProvider } from "@/lib/provider/QuestionnaireProvider";
import "@testing-library/jest-dom";
import JoinForm from "@/app/(protected)/questionnaire/join/[id]/page";
import QuestionnaireJoinWrapper from "@/components/respondent-side/join/QuestionnaireJoinWrapper";

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

jest.mock("next/navigation", () => {
  return { useRouter: jest.fn() };
});

jest.mock("@/lib/hooks/useQuestionnaireContext", () => ({
  useQuestionnaireContext: jest.fn(() => ({
    questionnaire: [],
    answers: [],
    setQuestionnaire: jest.fn(),
  })),
}));

describe("JoinForm Component", () => {
  test("renders JoinForm component with QuestionGetter and JoinFormWrapper", () => {
    render(
      <QuestionnaireProvider>
        <JoinForm params={{ id: "123" }} />
      </QuestionnaireProvider>
    );
    expect(screen.getByTestId("form-wrapper")).toBeInTheDocument();
  });
});

describe("Saved As Draft Functionality", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(jest.fn());
  });

  test("renders saved as draft modal", async () => {
    render(
      <QuestionnaireProvider>
        <JoinForm params={{ id: "123" }} />
      </QuestionnaireProvider>
    );
    const saveAsDraftButton = screen.getByTestId(
      "save-as-draft"
    ) as HTMLInputElement;
    saveAsDraftButton.click();
    await screen.findByText("Saved As Draft!");
  });
});

describe("Flow Skeleton Functionality", () => {
  test("allows user to progress through the form steps", async () => {
    render(
      <QuestionnaireProvider>
        <JoinForm params={{ id: "123" }} />
      </QuestionnaireProvider>
    );
    // expect(screen.getByText("Start")).toBeInTheDocument();
    // fireEvent.click(screen.getByText("Start"));

    // await screen.findByText("Ending");

    // expect(screen.getByText("Ending")).toBeInTheDocument();
    // expect(
    //   screen.getByText(
    //     "Thank you for participating! Your insights are valuable. I hope you don't mind joining future questionnaires."
    //   )
    // ).toBeInTheDocument();
    // expect(screen.getByText("Submit")).toBeInTheDocument();

    // const submitButton = screen.getByText("Submit") as HTMLButtonElement;
    // fireEvent.click(submitButton);

    await screen.findByText("Done and Dusted");
  });
});
