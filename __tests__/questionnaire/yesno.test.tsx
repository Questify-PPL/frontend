import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FirstComponentPage from "@/app/questionnaire/[type]/page";

describe("YesNo", () => {
  beforeEach(() => {
    render(<FirstComponentPage params={{ type: "yesno" }} />);
  });

  it("renders the Yes / No component correctly", () => {
    expect(screen.getByText("Yes / No")).toBeInTheDocument();
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

  it("allows inputting an answer in respondent mode with radio buttons", () => {
    const switchButton = screen.getByText(
      "Switch to Respondent Mode",
    ) as HTMLElement;
    fireEvent.click(switchButton);

    const yesRadioButton = screen.getByLabelText("Yes") as HTMLInputElement;
    const noRadioButton = screen.getByLabelText("No") as HTMLInputElement;

    fireEvent.click(yesRadioButton);
    expect(yesRadioButton.checked).toBe(true);
    expect(noRadioButton.checked).toBe(false);

    fireEvent.click(noRadioButton);
    expect(yesRadioButton.checked).toBe(false);
    expect(noRadioButton.checked).toBe(true);
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
});
