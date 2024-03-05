import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FirstComponentPage from "@/app/questionnaire/[type]/page";

describe("ShortText", () => {
  beforeEach(() => {
    render(<FirstComponentPage params={{ type: "short-text" }} />);
  });

  it("renders the ShortText component correctly", () => {
    expect(screen.getByText("Short Text")).toBeInTheDocument();
  });

  it("allows inputting a question", () => {
    const questionInput = screen.getByPlaceholderText(
      "Your question here.",
    ) as HTMLInputElement;
    fireEvent.change(questionInput, {
      target: { value: "What is your name?" },
    });

    expect(questionInput.value).toBe("What is your name?");
  });

  it("allows inputting a description", () => {
    const descriptionInput = screen.getByPlaceholderText(
      "Description (optional)",
    ) as HTMLInputElement;
    fireEvent.change(descriptionInput, {
      target: { value: "Please provide your name." },
    });

    expect(descriptionInput.value).toBe("Please provide your name.");
  });

  // TO BE DELETED
  it("allows toggling between respondent mode and creator mode", () => {
    const switchButton = screen.getByText("Switch to Respondent Mode");
    fireEvent.click(switchButton);

    expect(screen.getByText("Switch to Creator Mode")).toBeInTheDocument();
  });

  it("allows inputting an answer in respondent mode", () => {
    const switchButton = screen.getByText("Switch to Respondent Mode");
    fireEvent.click(switchButton);

    const answerInput = screen.getByPlaceholderText(
      "Type your answer here",
    ) as HTMLInputElement;
    fireEvent.change(answerInput, { target: { value: "John" } });

    expect(answerInput.value).toBe("John");
  });

  it("changes input height dynamically for question and description", () => {
    const questionInput = screen.getByPlaceholderText(
      "Your question here.",
    ) as HTMLTextAreaElement;
    fireEvent.change(questionInput, {
      target: { value: "This is a long question that should resize." },
    });

    const descriptionInput = screen.getByPlaceholderText(
      "Description (optional)",
    ) as HTMLTextAreaElement;
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

  it('displays "Required" when the switch is on creator mode', () => {
    const switchButton = screen.getByText("Switch to Respondent Mode");
    fireEvent.click(switchButton);

    expect(screen.queryByText("Required")).toBeNull();

    fireEvent.click(switchButton);

    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("should not display error message when answer field is not empty", () => {
    const switchButton = screen.getByText("Switch to Respondent Mode");
    fireEvent.click(switchButton);

    const answerInput = screen.getByPlaceholderText(
      "Type your answer here",
    ) as HTMLInputElement;
    fireEvent.change(answerInput, { target: { value: "John" } });

    expect(screen.queryByText("Answer can't be empty")).toBeNull();
  });

  it("displays error message when answer field is left empty and not required", () => {
    const switchButton = screen.getByText("Switch to Respondent Mode");
    fireEvent.click(switchButton);

    const answerInput = screen.getByPlaceholderText(
      "Type your answer here",
    ) as HTMLInputElement;
    fireEvent.change(answerInput, { target: { value: "" } });

    expect(screen.queryByText("Answer can't be empty")).toBeNull();
  });

  it("displays error message when question field is left empty", () => {
    const questionInput = screen.getByPlaceholderText(
      "Your question here.",
    ) as HTMLTextAreaElement;
    fireEvent.change(questionInput, {
      target: { value: "" },
    });

    fireEvent.blur(questionInput);

    expect(screen.getByText("Question can't be empty")).toBeInTheDocument();
  });

  it("sets maxLength to 70 for the answer field when type is short-text", () => {
    const switchButton = screen.getByText("Switch to Respondent Mode");
    fireEvent.click(switchButton);

    const answerInput = screen.getByPlaceholderText(
      "Type your answer here",
    ) as HTMLInputElement;
    
    expect(answerInput).toHaveAttribute("maxLength", "70");
  });
  
});

describe("LongText", () => {
  beforeEach(() => {
    render(<FirstComponentPage params={{ type: "long-text" }} />);
  });

  it("renders the LongText component correctly", () => {
    expect(screen.getByText("Long Text")).toBeInTheDocument();
  });

  it("does not set maxLength when type is not short-text", () => {
    const switchButton = screen.getByText("Switch to Respondent Mode");
    fireEvent.click(switchButton);
    
    const answerInput = screen.getByPlaceholderText(
      "Type your answer here",
    ) as HTMLInputElement;
    
    expect(answerInput).not.toHaveAttribute('maxLength');
  });
});
