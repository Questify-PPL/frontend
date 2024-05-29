import Questionnaire from "@/app/(protected)/questionnaire/page";
import { auth } from "@/auth";
import { DraftMobile, TableContent } from "@/components/forms";
import { getAllAvailableForm } from "@/lib/action/form";
import { QUESTIONNAIRES_FILLED } from "@/lib/constant";
import { BareForm } from "@/lib/types";
import { UserRole } from "@/lib/types/auth";
import * as utils from "@/lib/utils";
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
  getAllAvailableForm: jest.fn(),
}));

jest.mock("@/lib/utils", () => ({
  ...jest.requireActual("@/lib/utils"),
  useShareClick: jest.fn(() => jest.fn()),
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
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(jest.fn());
  });

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

    (getAllAvailableForm as jest.Mock).mockResolvedValue(mockedForms);

    (auth as jest.Mock).mockResolvedValue(session);

    render(await Questionnaire());

    expect(screen.getAllByText("Home")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Responses")[0]).toBeInTheDocument();
  });

  it("renders with error when fetching", async () => {
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

    (getAllAvailableForm as jest.Mock).mockRejectedValue(new Error("error"));

    (auth as jest.Mock).mockResolvedValue(session);

    render(await Questionnaire());

    expect(screen.getAllByText("Home")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Responses")[0]).toBeInTheDocument();
  });
});

describe("TableContent", () => {
  test("should be able to share form", async () => {
    render(
      <TableContent form={QUESTIONNAIRES_FILLED[0]} isRespondent={true} />,
    );

    const dropdownMenuTrigger = screen.getByTestId("dmt-respondent");
    expect(dropdownMenuTrigger).toBeInTheDocument();
  });
});

describe("DraftMobile", () => {
  test("should be able to share form", async () => {
    render(
      <DraftMobile
        form={QUESTIONNAIRES_FILLED[0]}
        isRespondent={true}
        isSendIcon={true}
      />,
    );

    const sendIcon = screen.getByTestId("share-icon");
    expect(sendIcon).toBeInTheDocument();
    fireEvent.click(sendIcon);

    expect(utils.useShareClick as jest.Mock).toHaveBeenCalled();
  });
});
