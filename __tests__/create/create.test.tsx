import Create from "@/app/(protected)/create/page";
import { auth } from "@/auth";
import { CreateWrapper } from "@/components/creator-side/create/CreateWrapper";
import { DraftContent } from "@/components/creator-side/create/DraftContent";
import { InfoTable } from "@/components/forms";
import { deleteQuestionnaire, getQuestionnairesOwned } from "@/lib/action/form";
import { UserRole } from "@/lib/types/auth";
import { BareForm } from "@/lib/types/form.type";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Session } from "next-auth";

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

jest.mock("react-dom/client", () => {
  const originalModule = jest.requireActual("react-dom/client");

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
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const session = {
    user: {
      email: "questify@gmail.com",
      id: "UI2100000000",
      roles: ["CREATOR", "RESPONDENT"] as UserRole[],
      ssoUsername: null,
      firstName: null,
      lastName: null,
      phoneNumber: null,
      gender: null,
      companyName: null,
      birthDate: null,
      credit: 0,
      isVerified: true,
      isBlocked: false,
      hasCompletedProfile: false,
      accessToken: "token",
      activeRole: "CREATOR",
    },
    expires: new Date().toISOString(),
  } as Session;

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
      formIsReported: false,
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
      formIsReported: false,
    },
  ];

  test("renders with no problems", async () => {
    (getQuestionnairesOwned as jest.Mock).mockResolvedValue(mockedForms);

    (auth as jest.Mock).mockReturnValue(session);

    render(await Create());
    render(<CreateWrapper forms={mockedForms} session={session} />);
  });

  test("renders with provided forms data", async () => {
    (getQuestionnairesOwned as jest.Mock).mockResolvedValue(mockedForms);

    render(<CreateWrapper forms={mockedForms} session={session} />);
    const createButton = screen.getByText("Create a new Questionnaire");
    expect(createButton).toBeInTheDocument();

    await screen.findAllByText("Mocked Form 1");
    await screen.findAllByText("Mocked Form 2");
  });

  test("renders with no forms data", async () => {
    (getQuestionnairesOwned as jest.Mock).mockResolvedValue([]);

    render(<CreateWrapper forms={mockedForms} session={session} />);
    const createButton = screen.getByText("Create a new Questionnaire");
    expect(createButton).toBeInTheDocument();
  });

  test("renders with error", async () => {
    (getQuestionnairesOwned as jest.Mock).mockRejectedValue(new Error("error"));

    render(<CreateWrapper forms={mockedForms} session={session} />);
    const createButton = screen.getByText("Create a new Questionnaire");
    expect(createButton).toBeInTheDocument();
  });

  test("renders with loading", async () => {
    (getQuestionnairesOwned as jest.Mock).mockResolvedValue({
      pending: true,
    });

    render(<CreateWrapper forms={mockedForms} session={session} />);
    const createButton = screen.getByText("Create a new Questionnaire");
    expect(createButton).toBeInTheDocument();
  });

  test("renders create with error when fetching", async () => {
    (getQuestionnairesOwned as jest.Mock).mockRejectedValue(new Error("error"));

    render(<CreateWrapper forms={mockedForms} session={session} />);
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
        formIsReported: false,
      },
    ];

    (getQuestionnairesOwned as jest.Mock).mockResolvedValue(mockedForms);

    render(
      <InfoTable>
        <DraftContent form={mockedForms[0]}></DraftContent>
      </InfoTable>,
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
        formIsReported: false,
      },
    ];

    (getQuestionnairesOwned as jest.Mock).mockResolvedValue(mockedForms);

    render(
      <InfoTable>
        <DraftContent form={mockedForms[0]}></DraftContent>
      </InfoTable>,
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
      }),
    );

    await screen.findByText("Delete");

    const deleteButton = screen.getByText("Delete");
    deleteButton.click();

    expect(deleteQuestionnaire).toHaveBeenCalledWith("1");
  });
});

describe("CreateModal Component", () => {
  const session = {
    user: {
      email: "questify@gmail.com",
      id: "UI2100000000",
      roles: ["CREATOR", "RESPONDENT"] as UserRole[],
      ssoUsername: null,
      firstName: null,
      lastName: null,
      phoneNumber: null,
      gender: null,
      companyName: null,
      birthDate: null,
      credit: 0,
      isVerified: true,
      isBlocked: false,
      hasCompletedProfile: false,
      accessToken: "token",
      activeRole: "CREATOR",
    },
    expires: new Date().toISOString(),
  } as Session;

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(jest.fn());
  });

  test("renders without crashing", async () => {
    render(<CreateWrapper forms={[]} session={session} />);
  });

  test("opens modal when create button is clicked", async () => {
    render(<CreateWrapper forms={[]} session={session} />);
    const createButton = screen.getByText("Create a new Questionnaire");
    createButton.click();
    await screen.findByText("Create a new Questionnaire");
  });
});
