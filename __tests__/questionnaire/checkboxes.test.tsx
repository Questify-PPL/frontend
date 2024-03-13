import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Checkboxes } from "@/components/questions";
import { QuestionnaireProvider } from "@/lib/provider";

describe("Checkbox component", () => {
  const mockQuestion = {
    numbering: 1,
    questionId: 1,
    questionTypeName: "Short Text",
    isRequired: false,
    question: "What is your name?",
    description: "Please provide your name.",
    answer: [],
  };

  it("renders correctly with provided props", () => {
    render(
      <QuestionnaireProvider>
        <Checkboxes {...mockQuestion} role="RESPONDENT" />,
      </QuestionnaireProvider>,
    );

    expect(screen.getByText("What is your name?")).toBeInTheDocument();
    expect(screen.getByText("Please provide your name.")).toBeInTheDocument();
  });

  it("allows changing the question", () => {
    render(
      <QuestionnaireProvider>
        <Checkboxes {...mockQuestion} role="RESPONDENT" />,
      </QuestionnaireProvider>,
    );

    const questionSpan = screen.getByText("What is your name?");
    questionSpan.textContent = "What is your age?";

    expect(questionSpan.textContent).toBe("What is your age?");
  });

  it("allows changing the description", () => {
    render(
      <QuestionnaireProvider>
        <Checkboxes {...mockQuestion} role="RESPONDENT" />,
      </QuestionnaireProvider>,
    );

    const descriptionSpan = screen.getByText("Please provide your name.");
    descriptionSpan.textContent = "Please provide your age.";

    expect(descriptionSpan.textContent).toBe("Please provide your age.");
  });
});
