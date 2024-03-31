import Summary from "@/app/(protected)/summary/form/[id]/page";
import { auth } from "@/auth";
import {
  getCompletedQuestionnaireForRespondent,
  getSummaries,
} from "@/lib/action/form";
import { BareForm } from "@/lib/types";
import { UserRole } from "@/lib/types/auth";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Session } from "next-auth";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock("@/lib/action/form", () => ({
  getSummaries: jest.fn(),
  getCompletedQuestionnaireForRespondent: jest.fn(),
}));

jest.mock("next/navigation", () => {
  return { useRouter: jest.fn(), usePathname: jest.fn() };
});

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

describe("Summary Page", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders with no problems as creator", async () => {
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
        credit: null,
        isVerified: true,
        isBlocked: false,
        hasCompletedProfile: false,
        activeRole: "CREATOR",
      },
      expires: new Date().toISOString(),
    } as Session;

    const mockedForms: BareForm = {
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
    };

    (getSummaries as jest.Mock).mockResolvedValue({
      formStatistics: mockedForms,
      questionsWithAnswers: [],
      allIndividuals: [],
    });

    (auth as jest.Mock).mockResolvedValue(session);

    render(
      await Summary({
        params: {
          id: "1",
        },
      }),
    );
  });

  test("renders with no problems as respondent", async () => {
    const session = {
      user: {
        email: "questify@gmail.com",
        id: "1",
        roles: ["RESPONDENT", "CREATOR"] as UserRole[],
        ssoUsername: null,
        firstName: null,
        lastName: null,
        phoneNumber: null,
        gender: null,
        companyName: null,
        birthDate: null,
        credit: null,
        isVerified: true,
        isBlocked: false,
        hasCompletedProfile: false,
        activeRole: "RESPONDENT",
      },
      expires: new Date().toISOString(),
    } as Session;

    const mockedForms: BareForm = {
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
    };

    (getCompletedQuestionnaireForRespondent as jest.Mock).mockResolvedValue(
      mockedForms,
    );

    (auth as jest.Mock).mockResolvedValue(session);

    render(
      await Summary({
        params: {
          id: "1",
        },
      }),
    );
  });

  it("should return empty object if fetch failed", async () => {
    const session = {
      user: {
        email: "questify@gmail.com",
        id: "1",
        roles: ["RESPONDENT", "CREATOR"] as UserRole[],
        ssoUsername: null,
        firstName: null,
        lastName: null,
        phoneNumber: null,
        gender: null,
        companyName: null,
        birthDate: null,
        credit: null,
        isVerified: true,
        isBlocked: false,
        hasCompletedProfile: false,
        activeRole: "RESPONDENT",
      },
      expires: new Date().toISOString(),
    } as Session;

    (getCompletedQuestionnaireForRespondent as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch"),
    );

    (auth as jest.Mock).mockResolvedValue(session);

    render(
      await Summary({
        params: {
          id: "1",
        },
      }),
    );
  });
});
