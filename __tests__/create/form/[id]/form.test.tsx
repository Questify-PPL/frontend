import React from "react";
import { render, screen } from "@testing-library/react";
import Form from "@/app/(protected)/create/form/[id]/page";
import { QuestionnaireProvider } from "@/lib/provider/QuestionnaireProvider";
import QuestionGetter from "@/components/creator-side/create/form/QuestionGetter";
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
    // Check if QuestionGetter and FormWrapper are rendered
    expect(screen.getByTestId("question-getter")).toBeInTheDocument();
    expect(screen.getByTestId("form-wrapper")).toBeInTheDocument();
  });
});

describe("QuestionGetter Component", () => {
  test("calls getter for certain id", async () => {
    const mockResponse = {
      data: {
        questions: [],
      },
    };
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    render(<QuestionGetter id="123" />);
  });
});
