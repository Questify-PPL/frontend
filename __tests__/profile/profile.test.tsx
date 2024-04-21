import ProfilePage from "@/app/(protected)/profile/page";
import { UserRole } from "@/lib/types/auth";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("@/auth", () => ({
  auth: jest.fn().mockResolvedValue({
    user: {
      email: "questify@gmail.com",
      id: "1",
      roles: ["CREATOR"] as UserRole[],
      ssoUsername: "questify",
      firstName: "first",
      lastName: "last",
      phoneNumber: "08123456789",
      gender: "male",
      companyName: "Questify",
      birthDate: new Date().toISOString(),
      credit: 0,
      isVerified: true,
      isBlocked: false,
      hasCompletedProfile: true,
    },
    expires: new Date().toISOString(),
  }),
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
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(jest.fn());
  });

  it("should renders without crashing", async () => {
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
});
