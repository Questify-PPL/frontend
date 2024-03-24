import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Form from "@/app/(protected)/create/form/[id]/page";
import { QuestionnaireProvider } from "@/lib/provider/QuestionnaireProvider";
import "@testing-library/jest-dom";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
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

describe("Form Component", () => {
  test("renders Form component with QuestionGetter and FormWrapper", () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>
    );
    expect(screen.getByTestId("form-wrapper")).toBeInTheDocument();
  });
});

describe("Add Question Functionality", () => {
  test("renders add question button", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>
    );
    expect(screen.getByText("Contents")).toBeInTheDocument();
    const contentButton = screen.getByText("Contents") as HTMLInputElement;
    contentButton.click();
    await screen.findByTestId("add-question");
  });

  test("renders add question modal", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>
    );
    const contentButton = screen.getByText("Contents") as HTMLInputElement;
    contentButton.click();
    const addQuestionButton = screen.getByTestId(
      "add-question"
    ) as HTMLInputElement;
    addQuestionButton.click();
    await screen.findByText("Choose a Question Type");
  });

  test("renders add question modal with question type", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>
    );
    const contentButton = screen.getByText("Contents") as HTMLInputElement;
    contentButton.click();
    const addQuestionButton = screen.getByTestId(
      "add-question"
    ) as HTMLInputElement;
    addQuestionButton.click();
    await screen.findByText("Choose a Question Type");
    expect(screen.getByText("Text")).toBeInTheDocument();
    expect(screen.getByText("Number")).toBeInTheDocument();
    expect(screen.getByText("Multiple Choice")).toBeInTheDocument();
    expect(screen.getByText("Scaler")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Others")).toBeInTheDocument();
  });

  test("renders add question modal and add short text question", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>
    );
    const contentButton = screen.getByText("Contents") as HTMLInputElement;
    contentButton.click();
    const addQuestionButton = screen.getByTestId(
      "add-question"
    ) as HTMLInputElement;
    addQuestionButton.click();
    await screen.findByText("Choose a Question Type");
    const shortTextButton = screen.getByText("Short Text") as HTMLInputElement;
    shortTextButton.click();
  });

  test("renders add question modal and cancel", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>
    );
    const contentButton = screen.getByText("Contents") as HTMLInputElement;
    contentButton.click();
    const addQuestionButton = screen.getByTestId(
      "add-question"
    ) as HTMLInputElement;
    addQuestionButton.click();
    await screen.findByText("Choose a Question Type");
    const cancelButton = screen.getByTestId(
      "cancel-add-question"
    ) as HTMLInputElement;
    fireEvent.click(cancelButton);
    await screen.findByText("Contents");
  });
});

describe("Saved As Draft Functionality", () => {
  test("renders saved as draft modal", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>
    );
    const contentButton = screen.getByText("Contents") as HTMLInputElement;
    contentButton.click();
    const saveAsDraftButton = screen.getByTestId(
      "save-as-draft"
    ) as HTMLInputElement;
    saveAsDraftButton.click();
    await screen.findByText("Saved As Draft!");
  });

  test("renders saved as draft modal and close", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>
    );
    const contentButton = screen.getByText("Contents") as HTMLInputElement;
    contentButton.click();
    const saveAsDraftButton = screen.getByTestId(
      "save-as-draft"
    ) as HTMLInputElement;
    saveAsDraftButton.click();
    await screen.findByText("Saved As Draft!");
    const closeButton = screen.getByTestId("cancel-saved-as-draft") as HTMLInputElement;
    fireEvent.click(closeButton);
    await screen.findByText("Contents");
  });
});
