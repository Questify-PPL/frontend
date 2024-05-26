import JoinForm, {
  generateMetadata,
} from "@/app/(protected)/questionnaire/join/[id]/page";
import { getQuestionnaireRespondent } from "@/lib/action/form";
import { QuestionnaireProvider } from "@/lib/provider/QuestionnaireProvider";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

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
  return { useRouter: jest.fn(), notFound: jest.fn() };
});

jest.mock("@/lib/hooks/useQuestionnaireContext", () => ({
  useQuestionnaireContext: jest.fn(() => ({
    questionnaire: [],
    answers: [],
    setQuestionnaire: jest.fn(),
  })),
}));

jest.mock("@/lib/action/form", () => ({
  getQuestionnaireRespondent: jest.fn(),
}));

describe("QuestionnaireJoinWrapper Component", () => {
  test("renders join page", async () => {
    (getQuestionnaireRespondent as jest.Mock).mockResolvedValue({
      data: {
        title: "Test Title",
      },
    });

    await generateMetadata({ params: { id: "123" } });

    render(await JoinForm({ params: { id: "123" } }));
  });

  test("metadata has but title is undefined", async () => {
    (getQuestionnaireRespondent as jest.Mock).mockResolvedValue({
      data: {
        title: undefined,
      },
    });

    await generateMetadata({ params: { id: "123" } });
  });

  test("generate metadata error", async () => {
    (getQuestionnaireRespondent as jest.Mock).mockRejectedValue(new Error());

    await generateMetadata({ params: { id: "123" } });
  });
});

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
