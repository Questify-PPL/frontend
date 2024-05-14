import ProfilePage from "@/app/(protected)/profile/page";
import { UserRole } from "@/lib/types/auth";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { auth } from "@/auth";
import { Session } from "next-auth";

jest.mock("@/auth", () => ({
  auth: jest.fn(),
}));

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

jest.mock("next/navigation", () => {
  return { useRouter: jest.fn() };
});

describe("Profile Page", () => {
  const session = {
    user: {
      email: "questify@gmail.com",
      id: "1",
      roles: ["CREATOR"] as UserRole[],
      ssoUsername: "Bebek",
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
      Respondent: {
        pity: 0,
      },
      Creator: {
        emailNotificationActive: true,
      },
    },
    expires: new Date().toISOString(),
  } as Session;

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(jest.fn());
  });

  it("should renders without crashing", async () => {
    (auth as jest.Mock).mockResolvedValue(session);

    render(await ProfilePage());

    const personalInformation = screen.getByText("Personal Information");
    expect(personalInformation).toBeInTheDocument();

    const ssoInformation = screen.getByText("SSO Information");
    expect(ssoInformation).toBeInTheDocument();

    const accountInformation = screen.getByText("Account Information");
    expect(accountInformation).toBeInTheDocument();

    const roleSpecificData = screen.getByText("Role Information");
    expect(roleSpecificData).toBeInTheDocument();
  });

  it("should render as admin", async () => {
    (auth as jest.Mock).mockResolvedValue({
      ...session,
      user: {
        ...session.user,
        activeRole: "ADMIN",
      },
    });

    render(await ProfilePage());

    const roleSpecificData = screen.getByText("Role Information");
    expect(roleSpecificData).toBeInTheDocument();
  });

  it("should render as respondent", async () => {
    (auth as jest.Mock).mockResolvedValue({
      ...session,
      user: {
        ...session.user,
        activeRole: "RESPONDENT",
      },
    });

    render(await ProfilePage());

    const roleSpecificData = screen.getByText("Role Information");
    expect(roleSpecificData).toBeInTheDocument();
  });
});
