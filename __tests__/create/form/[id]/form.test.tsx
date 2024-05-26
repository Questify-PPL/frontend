import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Form from "@/app/(protected)/create/form/[id]/page";
import { QuestionnaireProvider } from "@/lib/provider/QuestionnaireProvider";
import { QuestionChildren } from "@/components/creator-side/create/form/QuestionChildren";
import {
  deleteQuestion,
  getQuestionnaire,
  patchQuestionnaire,
} from "@/lib/action/form";
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
    questionnaire: [
      {
        type: "DEFAULT",
        question: {
          questionId: 1,
          number: 1,
          questionType: "TEXT",
          questionTypeName: "Short Text",
          isRequired: false,
          question: "question",
          description: "desc",
        },
      },
    ],
    activeQuestion: 1,
    answers: [],
    setQuestionnaire: jest.fn(),
    setActiveQuestion: jest.fn(),
    setAnswers: jest.fn(),
  })),
}));

jest.mock("@/lib/action/form", () => ({
  getQuestionnaire: jest.fn(),
  deleteQuestion: jest.fn(),
  patchQuestionnaire: jest.fn(),
}));

jest.mock("@/components/ui/use-toast", () => ({
  useToast: jest.fn(() => ({
    toast: jest.fn(),
  })),
}));

describe("Form Component", () => {
  test("renders Form component with QuestionGetter and FormWrapper", () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );
    expect(screen.getByTestId("form-wrapper")).toBeInTheDocument();
  });
});

describe("Add Question Functionality", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(jest.fn());
  });

  test("renders add question button", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );
    expect(screen.getByText("Contents")).toBeInTheDocument();
    const contentButton = screen.getByText("Contents");
    contentButton.click();
    await screen.findByTestId("add-question");
  });

  test("renders add question modal and cancel", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );
    const contentButton = screen.getByText("Contents");
    contentButton.click();
    const addQuestionButton = screen.getByTestId("add-question");
    addQuestionButton.click();
    await screen.findByText("Choose a Question Type");
    const cancelButton = screen.getByTestId("cancel-add-question");
    fireEvent.click(cancelButton);
    await screen.findByText("Contents");
  });

  test("renders add question modal with question type", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );
    const contentButton = screen.getByText("Contents");
    contentButton.click();
    const addQuestionButton = screen.getByTestId("add-question");
    addQuestionButton.click();
    await screen.findByText("Choose a Question Type");
    expect(screen.getByText("Text")).toBeInTheDocument();
    expect(screen.getByText("Number")).toBeInTheDocument();
    expect(screen.getByText("Multiple Choice")).toBeInTheDocument();
    expect(screen.getByText("Scaler")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Others")).toBeInTheDocument();
  });

  test("renders add question modal and cancel", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );
    const contentButton = screen.getByText("Contents");
    contentButton.click();
    const addQuestionButton = screen.getByTestId("add-question");
    addQuestionButton.click();
    await screen.findByText("Choose a Question Type");
    const cancelButton = screen.getByTestId("cancel-add-question");
    fireEvent.click(cancelButton);
    await screen.findByText("Contents");
  });

  test("renders add question modal try to add long text", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );
    const contentButton = screen.getByText("Contents");
    contentButton.click();
    const addQuestionButton = screen.getByTestId("add-question");
    addQuestionButton.click();
    await screen.findByText("Choose a Question Type");
    const numberButton = screen.getByText("Long Text");
    numberButton.click();

    expect(patchQuestionnaire).toHaveBeenCalled();
  });

  test("renders add question modal try to add checkbox question", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );
    const contentButton = screen.getByText("Contents");
    contentButton.click();
    const addQuestionButton = screen.getByTestId("add-question");
    addQuestionButton.click();
    await screen.findByText("Choose a Question Type");
    const numberButton = screen.getByText("Checkboxes");
    numberButton.click();

    expect(patchQuestionnaire).toHaveBeenCalled();
  });

  test("renders add question modal try to add multiple choice question", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );
    const contentButton = screen.getByText("Contents");
    contentButton.click();
    const addQuestionButton = screen.getByTestId("add-question");
    addQuestionButton.click();
    await screen.findByText("Choose a Question Type");
    const numberButton = screen.getByText("Multiple Choice");
    numberButton.click();

    expect(patchQuestionnaire).toHaveBeenCalled();
  });

  test("renders add question modal try to add yes-no question", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );
    const contentButton = screen.getByText("Contents");
    contentButton.click();
    const addQuestionButton = screen.getByTestId("add-question");
    addQuestionButton.click();
    await screen.findByText("Choose a Question Type");
    const numberButton = screen.getByText("Yes/No");
    numberButton.click();

    expect(patchQuestionnaire).toHaveBeenCalled();
  });

  test("renders add question modal try to add date question", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );
    const contentButton = screen.getByText("Contents");
    contentButton.click();
    const addQuestionButton = screen.getByTestId("add-question");
    addQuestionButton.click();
    await screen.findByText("Choose a Question Type");
    const numberButton = screen.getByText("Date");
    numberButton.click();

    expect(patchQuestionnaire).toHaveBeenCalled();
  });
});

describe("Saved As Draft Functionality", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(jest.fn());
  });

  test("renders saved as draft modal", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );
    const contentButton = screen.getByText("Contents");
    contentButton.click();
    const saveAsDraftButton = screen.getByTestId("save-as-draft");
    saveAsDraftButton.click();
    await screen.findByText("Saved As Draft!");
  });

  test("renders saved as draft modal and close", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );
    const contentButton = screen.getByText("Contents");
    contentButton.click();
    const saveAsDraftButton = screen.getByTestId("save-as-draft");
    saveAsDraftButton.click();
    await screen.findByText("Saved As Draft!");
    const closeButton = screen.getByTestId("cancel-saved-as-draft");
    fireEvent.click(closeButton);
    await screen.findByText("Contents");
  });

  test("renders published modal", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );
    const publishSection = screen.getByText("Publish");
    publishSection.click();

    await screen.findByTestId("publish-button");
    const publishButton = screen.getByTestId("publish-button");
    publishButton.click();
    await screen.findByText("Published!");
  });
});

describe("Delete Question Functionality", () => {
  test("delete question button can't be found in opening", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );
    expect(screen.getByText("Opening")).toBeInTheDocument();
    const openingButton = screen.getByText("Opening");
    openingButton.click();
    await screen.findByText("Cool Improvement");
    expect(screen.queryByTestId("delete-question")).toBeNull();
  });

  test("renders delete question button", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );
    await screen.findByTestId("delete-question");
  });

  test("renders delete question button and delete", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );
    await screen.findByTestId("delete-question");
    const deleteButton = screen.getByTestId("delete-question");
    deleteButton.click();
    expect(deleteQuestion).toHaveBeenCalled();
    await screen.findByText("Contents");
  });
});

describe("Duplicate Question Functionality", () => {
  test("duplicate question button cant be found in opening", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );
    expect(screen.getByText("Opening")).toBeInTheDocument();
    const openingButton = screen.getByText("Opening");
    openingButton.click();
    await screen.findByText("Cool Improvement");
    expect(screen.queryByTestId("duplicate-question")).toBeNull();
  });

  test("renders duplicate question button", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );
    await screen.findByTestId("duplicate-question");
  });

  test("renders duplicate question button and duplicate", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );
    await screen.findByTestId("duplicate-question");
    const duplicateButton = screen.getByTestId("duplicate-question");
    duplicateButton.click();
    expect(patchQuestionnaire).toHaveBeenCalled();
    await screen.findByText("Contents");
  });
});

describe("Move Up Question Functionality", () => {
  test("move up question button can't be found in opening", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );
    expect(screen.getByText("Opening")).toBeInTheDocument();
    const openingButton = screen.getByText("Opening");
    openingButton.click();
    await screen.findByText("Cool Improvement");
    expect(screen.queryByTestId("move-up-question")).toBeNull();
  });

  test("renders move up question button and move up question", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );
    await screen.findByTestId("move-up-question");
    const moveUpButton = screen.getByTestId("move-up-question");
    moveUpButton.click();
    expect(patchQuestionnaire).toHaveBeenCalled();
    await screen.findByText("Contents");
  });

  test("not render move up question button when it is the first question", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );
    await screen.findByTestId("move-up-question");
    const moveUpButton = screen.getByTestId("move-up-question");
    moveUpButton.click();
    expect(patchQuestionnaire).toHaveBeenCalled();
    await screen.findByText("Contents");
  });
});

describe("Move Down Question Functionality", () => {
  test("move down question button can't be found in opening", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );
    expect(screen.getByText("Opening")).toBeInTheDocument();
    const openingButton = screen.getByText("Opening");
    openingButton.click();
    await screen.findByText("Cool Improvement");
    expect(screen.queryByTestId("move-down-question")).toBeNull();
  });

  test("renders move down question button and move down question", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );
    await screen.findByTestId("move-down-question");
    const moveDownButton = screen.getByTestId("move-down-question");
    moveDownButton.click();
    expect(patchQuestionnaire).toHaveBeenCalled();
    await screen.findByText("Contents");
  });

  test("not render move down question button when it is the last question", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );
    await screen.findByTestId("move-down-question");
    const moveDownButton = screen.getByTestId("move-down-question");
    moveDownButton.click();
    expect(patchQuestionnaire).toHaveBeenCalled();
    await screen.findByText("Contents");
  });
});

describe("Form Component with Joyride", () => {
  test("Joyride runs and shows the first step", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );

    const joyrideTooltip = screen.getByText(
      "This is your workspace. You can create, edit, and publish your questionnaire here.",
    );
    expect(joyrideTooltip).toBeInTheDocument();
  });

  test("Joyride proceeds to the next step", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );

    const joyrideTooltip = screen.getByText(
      "This is your workspace. You can create, edit, and publish your questionnaire here.",
    );
    expect(joyrideTooltip).toBeInTheDocument();

    const nextButton = screen.getByText("Next (1/7)");
    fireEvent.click(nextButton);

    const nextStepTooltip = screen.getByText(
      "This is the left menu. You can navigate between the opening, contents, and ending sections of your questionnaire.",
    );
    expect(nextStepTooltip).toBeInTheDocument();
  });

  test("Joyride proceeds to end (skip)", async () => {
    render(
      <QuestionnaireProvider>
        <Form params={{ id: "123" }} />
      </QuestionnaireProvider>,
    );

    const joyrideTooltip = screen.getByText(
      "This is your workspace. You can create, edit, and publish your questionnaire here.",
    );
    expect(joyrideTooltip).toBeInTheDocument();

    const skipButton = screen.getByText("Skip");
    fireEvent.click(skipButton);
  });
});

describe("QuestionChildren Component", () => {
  test("renders QuestionChildren component", async () => {
    render(
      <QuestionnaireProvider>
        <QuestionChildren id="1" />
      </QuestionnaireProvider>,
    );
    await screen.findByText("Type");
  });

  test("renders QuestionChildren component and change question type", async () => {
    render(
      <QuestionnaireProvider>
        <QuestionChildren id="1" />
      </QuestionnaireProvider>,
    );
    await screen.findByText("Short Text");
    const trigger = screen.getByText("Short Text");
    fireEvent.click(trigger);
  });

  test("renders QuestionChildren component and change required status", async () => {
    render(
      <QuestionnaireProvider>
        <QuestionChildren id="1" />
      </QuestionnaireProvider>,
    );
    await screen.findByText("Required");
    const trigger = screen.getByText("Required");
    fireEvent.click(trigger);
  });
});
