import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import HomeLayout from "@/app/(protected)/layout";
import React from "react";
import Home from "@/app/(protected)/home/page";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { UserRole } from "@/lib/types/auth";
import {
  getQuestionnairesOwned,
  getQuestionnairesFilled,
} from "@/lib/action/form";
import { BareForm } from "@/lib/types";
import { getInvoices } from "@/lib/action";
import RespondentHomePage from "@/components/respondent-side/RespondentHomePage";
import { useRouter } from "next/navigation";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock("@/lib/action/form", () => ({
  getQuestionnairesOwned: jest.fn(),
  getQuestionnairesFilled: jest.fn(),
}));

jest.mock("@/lib/action", () => ({
  getInvoices: jest.fn(),
}));

jest.mock("next/navigation", () => {
  const push = jest.fn();

  return {
    useRouter: () => ({
      push,
    }),
    usePathname: jest.fn(),
  };
});

const mockedDispact = jest.fn();

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

jest.mock("@/auth", () => {
  return {
    __esModule: true,
    auth: jest.fn(),
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Login", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(jest.fn());
  });

  it("renders without crashing", async () => {
    global.fetch = jest.fn(
      () =>
        Promise.resolve({
          json: () => Promise.resolve({ data: { accessToken: "" } }),
          status: 201,
        }) as Promise<Response>,
    );
    const props = {
      children: <div data-testid="div"></div>,
    };

    render(await HomeLayout(props));

    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();

    const div = screen.getByTestId("div");
    expect(div).toBeInTheDocument();
  });
  test("renders home page with no problem", async () => {
    const session = {
      user: {
        email: "questify@gmail.com",
        id: "1",
        roles: ["CREATOR"] as UserRole[],
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

    (getQuestionnairesOwned as jest.Mock).mockResolvedValue(mockedForms);

    (auth as jest.Mock).mockResolvedValue(session);

    render(await Home());

    expect(screen.getAllByText("Home")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Responses")[0]).toBeInTheDocument();

    expect(screen.getByText("empty forms")).toBeInTheDocument();
    expect(screen.getByText("credits")).toBeInTheDocument();
  });

  test("renders home page with no problem as respondent", async () => {
    const session = {
      user: {
        email: "questify@gmail.com",
        id: "1",
        roles: ["CREATOR"] as UserRole[],
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
        activeRole: "RESPONDENT",
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

    (getQuestionnairesFilled as jest.Mock).mockResolvedValue(mockedForms);

    (auth as jest.Mock).mockResolvedValue(session);

    render(await Home());
  });

  test("renders with problem when fetching", async () => {
    const session = {
      user: {
        email: "questify@gmail.com",
        id: "1",
        roles: ["CREATOR"] as UserRole[],
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
        activeRole: "CREATOR",
      },
      expires: new Date().toISOString(),
    } as Session;

    (getQuestionnairesOwned as jest.Mock).mockRejectedValue(new Error(""));

    (auth as jest.Mock).mockResolvedValue(session);

    render(await Home());

    expect(screen.getByText("empty forms")).toBeInTheDocument();
  });
});

describe("Admin", () => {
  const session = {
    user: {
      email: "questify@gmail.com",
      id: "1",
      roles: ["ADMIN"] as UserRole[],
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
      activeRole: "ADMIN",
    },
    expires: new Date().toISOString(),
  } as Session;

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(jest.fn());
  });

  test("renders home page with no problem", async () => {
    (auth as jest.Mock).mockResolvedValue(session);
    (getInvoices as jest.Mock).mockResolvedValue([]);

    render(await Home());

    const adminHomepage = screen.getByTestId("admin-homepage");
    expect(adminHomepage).toBeInTheDocument();
  });

  test("renders with problem when fetching", async () => {
    (auth as jest.Mock).mockResolvedValue(session);

    (getInvoices as jest.Mock).mockRejectedValue(new Error(""));

    render(await Home());

    const adminHomepage = screen.getByTestId("admin-homepage");
    expect(adminHomepage).toBeInTheDocument();
  });
});

describe("Respondent", () => {
  const session = {
    user: {
      email: "questify@gmail.com",
      id: "1",
      roles: ["RESPONDENT"] as UserRole[],
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
      activeRole: "RESPONDENT",
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
      isCompleted: false,
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
      isCompleted: true,
    },
  ];

  const router = useRouter();

  test("renders correctly when there are no forms", () => {
    (auth as jest.Mock).mockResolvedValue(session);

    render(
      <RespondentHomePage forms={[]} isRespondent={true} session={session} />,
    );

    expect(screen.getByTestId("home-card")).toBeInTheDocument();
    expect(
      screen.queryByText("Here are your on-going answered questionnaire(s)"),
    ).not.toBeInTheDocument();
  });

  test("should navigate to continue upon clicking uncompleted form", () => {
    (auth as jest.Mock).mockResolvedValue(session);

    render(
      <RespondentHomePage
        forms={mockedForms}
        isRespondent={true}
        session={session}
      />,
    );

    fireEvent.click(screen.getAllByText(mockedForms[0].title)[0]);
    expect(router.push).toHaveBeenCalledWith(
      `questionnaire/join/${mockedForms[0].id}`,
    );
  });

  test("should navigate to summary upon clicking completed form", () => {
    (auth as jest.Mock).mockResolvedValue(session);

    render(
      <RespondentHomePage
        forms={mockedForms}
        isRespondent={true}
        session={session}
      />,
    );

    fireEvent.click(screen.getAllByText(mockedForms[1].title)[0]);
    expect(router.push).toHaveBeenCalledWith(
      `summary/form/${mockedForms[1].id}`,
    );
  });
});
