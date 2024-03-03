import { authenticate, logout } from "@/lib/action";
import { signIn, signOut, auth } from "@/auth";
import { Session } from "next-auth";
import { UserRole } from "@/lib/types/auth/user";
import { logoutUrl as ssoLogoutUrl } from "@/lib/services";

jest.mock("@/auth", () => {
  return {
    __esModule: true,
    signIn: jest.fn(),
    signOut: jest.fn(),
    auth: jest.fn(),
  };
});

describe("Authenticate action", () => {
  it("should call signIn middleware", async () => {
    (signIn as jest.Mock).mockResolvedValue({});
    await authenticate(undefined, new FormData());
    expect(signIn).toHaveBeenCalledTimes(1);
  });

  it("should return error for invalid credentials", async () => {
    const errorMessage = "error";
    (signIn as jest.Mock).mockRejectedValue(new Error(errorMessage));
    await expect(authenticate(undefined, new FormData())).rejects.toThrow(
      errorMessage,
    );
  });
});

describe("signOut", () => {
  beforeEach(() => {
    (signOut as jest.Mock).mockClear();
  });

  it("should signOut valid user", async () => {
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
      },
      expires: new Date().toISOString(),
    } as Session;

    (auth as jest.Mock).mockResolvedValue(session);
    (signOut as jest.Mock).mockResolvedValue({});

    await logout();
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(signOut).toHaveBeenCalledWith({ redirectTo: "/login" });
  });

  it("should signOut valid SSO user", async () => {
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
        credit: null,
        isVerified: true,
        isBlocked: false,
        hasCompletedProfile: false,
      },
      expires: new Date().toISOString(),
    } as Session;

    (auth as jest.Mock).mockResolvedValue(session);
    (signOut as jest.Mock).mockResolvedValue({});

    await logout();
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(signOut).toHaveBeenCalledWith({ redirectTo: ssoLogoutUrl });
  });
});
