import React from "react";
import { render, screen } from "@testing-library/react";
import CreateQuestionnaire from "@/app/questionnaire/create/page";
import { QuestionnaireProvider } from "@/lib/provider/QuestionnaireProvider";
import { useQuestionnaireContext } from "@/lib/hooks/useQuestionnaireContext";
import { QUESTIONNAIRE, ANSWERS } from "@/lib/constant";
import "@testing-library/jest-dom";

jest.mock("@/lib/hooks/useQuestionnaireContext");

describe("CreateQuestionnaire", () => {
  beforeEach(() => {
    (useQuestionnaireContext as jest.Mock).mockReturnValue({
      questionnaire: QUESTIONNAIRE,
      answers: ANSWERS,
      errorStatus: false,
      setQuestionnaire: jest.fn(),
      setAnswers: jest.fn(),
      setErrorStatus: jest.fn(),
    });
  });

  it("renders without crashing", () => {
    render(
      <QuestionnaireProvider>
        <CreateQuestionnaire />
      </QuestionnaireProvider>,
    );

    expect(screen.getByTestId("create-questionnaire")).toBeInTheDocument();
  });

  it("renders the Questionnaire component", () => {
    render(
      <QuestionnaireProvider>
        <CreateQuestionnaire />
      </QuestionnaireProvider>,
    );

    expect(screen.getByTestId("questionnaire-component")).toBeInTheDocument();
  });

  it("should not crash when question is not available", () => {
    (useQuestionnaireContext as jest.Mock).mockReturnValue({
      questionnaire: [],
      answers: ANSWERS,
      errorStatus: false,
      setQuestionnaire: jest.fn(),
      setAnswers: jest.fn(),
      setErrorStatus: jest.fn(),
    });

    render(
      <QuestionnaireProvider>
        <CreateQuestionnaire />
      </QuestionnaireProvider>,
    );

    expect(screen.getByTestId("questionnaire-component")).toBeInTheDocument();
  });

  it("should not crash when answers is not available", () => {
    (useQuestionnaireContext as jest.Mock).mockReturnValue({
      questionnaire: QUESTIONNAIRE,
      answers: [],
      errorStatus: false,
      setQuestionnaire: jest.fn(),
      setAnswers: jest.fn(),
      setErrorStatus: jest.fn(),
    });

    render(
      <QuestionnaireProvider>
        <CreateQuestionnaire />
      </QuestionnaireProvider>,
    );

    expect(screen.getByTestId("questionnaire-component")).toBeInTheDocument();
  });
});
