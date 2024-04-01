import "@testing-library/jest-dom";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Create from "@/app/(protected)/create/page";
import { CreateWrapper } from "@/components/creator-side/create/CreateWrapper";
import { deleteQuestionnaire, getQuestionnairesOwned } from "@/lib/action/form";
import { BareForm } from "@/lib/types/form.type";
import { InfoTable } from "@/components/forms";
import { DraftContent } from "@/components/creator-side/create/DraftContent";
import { useRouter } from "next/navigation";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock("@/lib/action/form", () => ({
  getQuestionnairesOwned: jest.fn(),
  deleteQuestionnaire: jest.fn(),
}));

jest.mock("next/navigation", () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
      refresh: jest.fn(),
    }),
    usePathname: jest.fn(),
  };
});

class MockPointerEvent extends Event {
  button: number;
  ctrlKey: boolean;
  pointerType: string;

  constructor(type: string, props: PointerEventInit) {
    super(type, props);
    this.button = props.button || 0;
    this.ctrlKey = props.ctrlKey || false;
    this.pointerType = props.pointerType || "mouse";
  }
}

window.PointerEvent = MockPointerEvent as any;

const mockedDispact = jest.fn();

jest.mock("react-dom", () => {
  const originalModule = jest.requireActual("react-dom");

  return {
    ...originalModule,
    useFormState: (action: unknown, initialState: unknown) => [
      undefined,
      mockedDispact,
    ],
    useFormStatus: jest.fn().mockReturnValue({
      pending: true,
      data: null,
      method: null,
      action: null,
    }),
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
      Events: [],
    },
  };
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("CreateWrapper Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders with no problems", async () => {
    const mockedForms: BareForm[] = [
      {
        id: "1",
        title: "Mocked Form 1",
        prize: 100,
        prizeType: "EVEN",
        maxWinner: 1,
        createdAt: "2024-03-17T12:00:00Z",
        updatedAt: "2024-03-17T12:00:00Z",
        endedAt: "2024-03-18T12:00:00Z",
        ongoingParticipation: 10,
        completedParticipation: 5,
      },
      {
        id: "2",
        title: "Mocked Form 2",
        prize: 200,
        prizeType: "LUCKY",
        maxWinner: 2,
        createdAt: "2024-03-16T12:00:00Z",
        updatedAt: "2024-03-16T12:00:00Z",
        endedAt: "2024-03-17T12:00:00Z",
        ongoingParticipation: 15,
        completedParticipation: 8,
      },
    ];

    (getQuestionnairesOwned as jest.Mock).mockResolvedValue(mockedForms);

    render(await Create());
    render(<CreateWrapper forms={mockedForms} />);
  });

  test("renders with provided forms data", async () => {
    const mockedForms: BareForm[] = [
      {
        id: "1",
        title: "Mocked Form 1",
        prize: 100,
        prizeType: "EVEN",
        maxWinner: 1,
        createdAt: "2024-03-17T12:00:00Z",
        updatedAt: "2024-03-17T12:00:00Z",
        endedAt: "2024-03-18T12:00:00Z",
        ongoingParticipation: 10,
        completedParticipation: 5,
      },
      {
        id: "2",
        title: "Mocked Form 2",
        prize: 200,
        prizeType: "LUCKY",
        maxWinner: 2,
        createdAt: "2024-03-16T12:00:00Z",
        updatedAt: "2024-03-16T12:00:00Z",
        endedAt: "2024-03-17T12:00:00Z",
        ongoingParticipation: 15,
        completedParticipation: 8,
      },
    ];

    (getQuestionnairesOwned as jest.Mock).mockResolvedValue(mockedForms);

    render(<CreateWrapper forms={mockedForms} />);
    const createButton = screen.getByText("Create a new Questionnaire");
    expect(createButton).toBeInTheDocument();

    mockedForms.forEach((form) => {
      const formElement = screen.getByText(form.title);
      expect(formElement).toBeInTheDocument();
    });
  });

  test("renders with no forms data", async () => {
    (getQuestionnairesOwned as jest.Mock).mockResolvedValue([]);

    render(<CreateWrapper forms={[]} />);
    const createButton = screen.getByText("Create a new Questionnaire");
    expect(createButton).toBeInTheDocument();
  });

  test("renders with error", async () => {
    (getQuestionnairesOwned as jest.Mock).mockRejectedValue(new Error("error"));

    render(<CreateWrapper forms={[]} />);
    const createButton = screen.getByText("Create a new Questionnaire");
    expect(createButton).toBeInTheDocument();
  });

  test("renders with loading", async () => {
    (getQuestionnairesOwned as jest.Mock).mockResolvedValue({
      pending: true,
    });

    render(<CreateWrapper forms={[]} />);
    const createButton = screen.getByText("Create a new Questionnaire");
    expect(createButton).toBeInTheDocument();
  });

  test("renders create with error when fetching", async () => {
    (getQuestionnairesOwned as jest.Mock).mockRejectedValue(new Error("error"));

    render(await Create());

    const createButton = screen.getByText("Create a new Questionnaire");
    expect(createButton).toBeInTheDocument();
  });

  test("renders infotable", async () => {
    const mockedForms: BareForm[] = [
      {
        id: "1",
        title: "Mocked Form 1",
        prize: 100,
        prizeType: "EVEN",
        maxWinner: 1,
        createdAt: "2024-03-17T12:00:00Z",
        updatedAt: "2024-03-17T12:00:00Z",
        endedAt: "2024-03-18T12:00:00Z",
        ongoingParticipation: 10,
        completedParticipation: 5,
      },
    ];

    (getQuestionnairesOwned as jest.Mock).mockResolvedValue(mockedForms);

    render(
      <InfoTable>
        <DraftContent form={mockedForms[0]}></DraftContent>
      </InfoTable>
    );
    expect(screen.getByText("Mocked Form 1")).toBeInTheDocument();
  });

  test("can access more button", async () => {
    const mockedForms: BareForm[] = [
      {
        id: "1",
        title: "Mocked Form 1",
        prize: 100,
        prizeType: "EVEN",
        maxWinner: 1,
        createdAt: "2024-03-17T12:00:00Z",
        updatedAt: "2024-03-17T12:00:00Z",
        endedAt: "2024-03-18T12:00:00Z",
        ongoingParticipation: 10,
        completedParticipation: 5,
      },
    ];

    (getQuestionnairesOwned as jest.Mock).mockResolvedValue(mockedForms);

    render(
      <InfoTable>
        <DraftContent form={mockedForms[0]}></DraftContent>
      </InfoTable>
    );
    expect(screen.getByText("Mocked Form 1")).toBeInTheDocument();
    const moreButton = screen.getByRole("button", {
      name: "More",
    }) as HTMLButtonElement;
    fireEvent.pointerDown(
      moreButton,
      new PointerEvent("pointerdown", {
        ctrlKey: false,
        button: 0,
      })
    );

    await screen.findByText("Delete");

    const deleteButton = screen.getByText("Delete");
    deleteButton.click();

    expect(deleteQuestionnaire).toHaveBeenCalledWith("1");

    expect(useRouter().refresh).toHaveBeenCalled();
  });
});

describe("CreateModal Component", () => {
  test("renders without crashing", async () => {
    const props = {
      formsRemainder: 0,
      creditsBalance: 0,
      onCancel: jest.fn(),
    };
    render(<CreateWrapper forms={[]} />);
    const createButton = screen.getByText("Create a new Questionnaire");
    expect(createButton).toBeInTheDocument();
  });

  test("opens modal when create button is clicked", async () => {
    const props = {
      formsRemainder: 0,
      creditsBalance: 0,
      onCancel: jest.fn(),
    };
    render(<CreateWrapper forms={[]} />);
    const createButton = screen.getByText("Create a new Questionnaire");
    expect(createButton).toBeInTheDocument();

    createButton.click();

    await screen.findByText("Give the Questionnaire what it needs first :)");
  });
});
