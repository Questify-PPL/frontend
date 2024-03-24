import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Text } from "@/components/questions";
import { QuestionnaireProvider } from "@/lib/provider";

describe("Text component", () => {
  const mockQuestion = {
    numbering: 1,
    questionId: 1,
    questionTypeName: "Short Text",
    isRequired: false,
    question: "What is your name?",
    description: "Please provide your name.",
    answer: "John",
    status: true,
  };

  it("renders correctly with provided props", () => {
    render(
      <QuestionnaireProvider>
        <Text {...mockQuestion} role="RESPONDENT" />
      </QuestionnaireProvider>,
    );

    expect(screen.getByText("What is your name?")).toBeInTheDocument();
    expect(screen.getByText("Please provide your name.")).toBeInTheDocument();
    expect(screen.getByDisplayValue("John")).toBeInTheDocument();
  });

  it("displays textarea for answer when questionnaire can be modified in respondent mode", () => {
    render(
      <QuestionnaireProvider>
        <Text {...mockQuestion} role="RESPONDENT" />
      </QuestionnaireProvider>,
    );

    expect(screen.getByPlaceholderText("Type your answer here")).toBeInTheDocument();
    expect(screen.queryByTestId("answerLabel")).not.toBeInTheDocument();
  });

  it("should not display textarea for answer in creator mode", () => {
    render(
      <QuestionnaireProvider>
        <Text {...mockQuestion} role="CREATOR" />
      </QuestionnaireProvider>,
    );

    expect(
      screen.queryByPlaceholderText("Type your answer here"),
    ).not.toBeInTheDocument();
  });

  it("allows changing the question", () => {
    render(
      <QuestionnaireProvider>
        <Text {...mockQuestion} role="CREATOR" />
      </QuestionnaireProvider>,
    );
    const questionInput = screen.getByText("What is your name?");
    fireEvent.change(questionInput, { target: { value: "What is your age?" } });

    expect(questionInput.textContent).toBe("What is your age?");
  });

  it("allows changing the description", () => {
    render(
      <QuestionnaireProvider>
        <Text {...mockQuestion} role="CREATOR" />
      </QuestionnaireProvider>,
    );
    const descriptionInput = screen.getByText("Please provide your name.");
    fireEvent.change(descriptionInput, {
      target: { value: "Please provide your age." },
    });

    expect(descriptionInput.textContent).toBe("Please provide your age.");
  });

  it("allows changing the answer", () => {
    render(
      <QuestionnaireProvider>
        <Text {...mockQuestion} role="RESPONDENT" />
      </QuestionnaireProvider>,
    );
    const answerInput = screen.getByText("John");
    fireEvent.change(answerInput, { target: { value: "Jane" } });

    expect(answerInput.textContent).toBe("Jane");
  });

  it('sets maxLength to 70 when type is "Short Text"', () => {
    render(
      <QuestionnaireProvider>
        <Text
          {...mockQuestion}
          role="RESPONDENT"
          questionTypeName="Short Text"
        />
      </QuestionnaireProvider>,
    );
    const textInput = screen.getByTestId("textInput");

    expect(textInput).toHaveAttribute("maxLength", "70");
  });

  it('should not set maxLength when type is not "Short Text"', () => {
    render(
      <QuestionnaireProvider>
        <Text
          {...mockQuestion}
          role="RESPONDENT"
          questionTypeName="Long Text"
        />
      </QuestionnaireProvider>,
    );
    const textInput = screen.getByTestId("textInput");

    expect(textInput).not.toHaveAttribute("maxLength");
  });

  it("changes input height dynamically for question and description", () => {
    render(
      <QuestionnaireProvider>
        <Text {...mockQuestion} role="CREATOR" />
      </QuestionnaireProvider>,
    );
    const questionInput = screen.getByDisplayValue("What is your name?");
    fireEvent.change(questionInput, {
      target: { value: "This is a long question that should resize." },
    });

    const descriptionInput = screen.getByDisplayValue(
      "Please provide your name.",
    );
    fireEvent.change(descriptionInput, {
      target: { value: "This is a long description that should resize." },
    });

    expect(questionInput).toHaveStyle(
      `height: ${questionInput.scrollHeight}px`,
    );
    expect(descriptionInput).toHaveStyle(
      `height: ${descriptionInput.scrollHeight}px`,
    );
  });

  it("renders Date input field for type Date", () => {
    render(
      <QuestionnaireProvider>
        <Text {...mockQuestion} role="RESPONDENT" questionTypeName="Date" />
      </QuestionnaireProvider>,
    );

    expect(screen.getByTestId("dateInput")).toBeInTheDocument();
  });

  it("allows changing the date answer", () => {
    render(
      <QuestionnaireProvider>
        <Text {...mockQuestion} role="RESPONDENT" questionTypeName="Date" />
      </QuestionnaireProvider>,
    );
    const dateInput = screen.getByTestId("dateInput") as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: "2024-03-12" } });

    expect(dateInput.value).toBe("2024-03-12");
  });

  it("displays error message for empty answer when required", () => {
    render(
      <QuestionnaireProvider>
        <Text
          {...mockQuestion}
          role="RESPONDENT"
          questionTypeName="Date"
          isRequired={true}
          answer=""
        />
      </QuestionnaireProvider>,
    );
    fireEvent.blur(screen.getByTestId("dateInput"));

    expect(screen.getByText("Answer can't be empty.")).toBeInTheDocument();
  });

  it("should not display error message for empty answer when not required", () => {
    render(
      <QuestionnaireProvider>
        <Text
          {...mockQuestion}
          role="RESPONDENT"
          questionTypeName="Date"
          isRequired={false}
          answer=""
        />
      </QuestionnaireProvider>,
    );
    fireEvent.blur(screen.getByTestId("dateInput"));

    expect(
      screen.queryByText("Answer can't be empty."),
    ).not.toBeInTheDocument();
  });

  it('should not display error message for invalid URL when type is "Short Text"', () => {
    render(
      <QuestionnaireProvider>
        <Text
          {...mockQuestion}
          role="RESPONDENT"
          questionTypeName="Short Text"
        />
      </QuestionnaireProvider>,
    );
    fireEvent.change(screen.getByPlaceholderText("Type your answer here"), {
      target: { value: "invalidurl" },
    });
    fireEvent.blur(screen.getByPlaceholderText("Type your answer here"));

    expect(
      screen.queryByText("Please enter a valid URL."),
    ).not.toBeInTheDocument();
  });

  it('displays error message for invalid URL when type is "Link"', () => {
    render(
      <QuestionnaireProvider>
        <Text {...mockQuestion} role="RESPONDENT" questionTypeName="Link" />
      </QuestionnaireProvider>,
    );
    fireEvent.change(screen.getByPlaceholderText("Type your answer here"), {
      target: { value: "invalidurl" },
    });
    fireEvent.blur(screen.getByPlaceholderText("Type your answer here"));

    expect(screen.getByText("Please enter a valid URL.")).toBeInTheDocument();
  });

  it("should not display error message for valid URL", () => {
    render(
      <QuestionnaireProvider>
        <Text {...mockQuestion} role="RESPONDENT" questionTypeName="Link" />
      </QuestionnaireProvider>,
    );
    fireEvent.change(screen.getByPlaceholderText("Type your answer here"), {
      target: { value: "https://example.com" },
    });
    fireEvent.blur(screen.getByPlaceholderText("Type your answer here"));

    expect(
      screen.queryByText("Please enter a valid URL."),
    ).not.toBeInTheDocument();
  });

  it("displays label for answer when questionnaire can't be modified in respondent mode", () => {
    render(
      <QuestionnaireProvider>
        <Text {...mockQuestion} role="RESPONDENT" status={false} />
      </QuestionnaireProvider>,
    );

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Type your answer here")).not.toBeInTheDocument();
    expect(screen.queryByTestId("answerLabel")).toBeInTheDocument();
  });

  it("should not display label for answer in creator mode", () => {
    render(
      <QuestionnaireProvider>
        <Text {...mockQuestion} role="CREATOR" status={false} />
      </QuestionnaireProvider>,
    );

    expect(screen.queryByText("John")).not.toBeInTheDocument();
    expect(screen.queryByTestId("answerLabel")).not.toBeInTheDocument();
  });
});
