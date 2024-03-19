import HomeLayout from "@/app/(protected)/layout";
import Questionnaire from "@/app/(protected)/questionnaire/page";
import { auth } from "@/auth";
import { getQuestionnairesFilled } from "@/lib/action/form";
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
  getQuestionnairesOwned: jest.fn(),
  getQuestionnairesFilled: jest.fn(),
}));

jest.mock("next/navigation", () => {
  return { useRouter: jest.fn(), usePathname: jest.fn() };
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

describe("Questionnaire List View Page", () => {
  test("renders questionnaire list view page with no problem", async () => {
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

    (getQuestionnairesFilled as jest.Mock).mockResolvedValue(mockedForms);

    (auth as jest.Mock).mockResolvedValue(session);

    render(await Questionnaire());

    expect(screen.getByText("Home")).toBeInTheDocument();

    expect(screen.getByText("Responses")).toBeInTheDocument();
  });
});
