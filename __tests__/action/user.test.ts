import { authenticate, logout, changeRole, updateProfile } from "@/lib/action";
import { signIn, signOut, auth, unstable_update as update } from "@/auth";
import { Session } from "next-auth";
import { UserRole } from "@/lib/types/auth/user";
import { logoutUrl as ssoLogoutUrl } from "@/lib/services";
import axios from "axios";
import { createReport } from "@/lib/action/user";

jest.mock("@/auth", () => {
  return {
    __esModule: true,
    signIn: jest.fn(),
    signOut: jest.fn(),
    auth: jest.fn(),
    unstable_update: jest.fn(),
  };
});

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

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
        credit: 0,
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
    expect(signOut).toHaveBeenCalledWith({ redirectTo: "/" });
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
        credit: 0,
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

describe("update user role", () => {
  it("should call update method", async () => {
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
      },
      expires: new Date().toISOString(),
    } as Session;

    (auth as jest.Mock).mockResolvedValue(session);

    await changeRole("RESPONDENT");

    expect(update).toHaveBeenCalled();
  });
});

describe("Update user information", () => {
  it("should update valid user information", async () => {
    const formData = new FormData();
    formData.append("firstName", "Questify");
    formData.append("lastName", "Questify");
    formData.append("birthDate", "2021-01-01");
    formData.append("gender", "MALE");
    formData.append("phoneNumber", "08123456789");
    formData.append("companyName", "Questify");

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
      },
      expires: new Date().toISOString(),
    } as Session;

    // Mock
    (auth as jest.Mock).mockResolvedValue(session);
    const expectedResponse = {
      data: {
        statusCode: 200,
        message: "Success",
        data: {},
      },
    };
    mockedAxios.patch.mockResolvedValue(expectedResponse);

    await updateProfile(undefined, formData);

    expect(update).toHaveBeenCalled();
  });

  it("should return error message on invalid user information", async () => {
    const formData = new FormData();
    formData.append("firstName", "");
    formData.append("lastName", "");
    formData.append("birthDate", "");
    formData.append("gender", "");
    formData.append("phoneNumber", "");
    formData.append("companyName", "");

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
      },
      expires: new Date().toISOString(),
    } as Session;

    // Mock
    (auth as jest.Mock).mockResolvedValue(session);
    const expectedResponse = {
      data: {
        statusCode: 200,
        message: "Success",
        data: {},
      },
    };
    mockedAxios.patch.mockResolvedValue(expectedResponse);

    const result = await updateProfile(undefined, formData);
    expect(result).toEqual({
      formErrors: [],
      fieldErrors: {
        firstName: ["Name must not be empty"],
        gender: ["Invalid enum value. Expected 'MALE' | 'FEMALE', received ''"],
        birthDate: ["Birth date must be in the past"],
        phoneNumber: ["Phone number must be at least 10 digits"],
        companyName: ["String must contain at least 2 character(s)"],
      },
    });
  });

  it("should return error message on invalid user information", async () => {
    const formData = new FormData();
    formData.append("firstName", "Questify");
    formData.append("lastName", "Questify");
    formData.append("birthDate", "2021-01-01");
    formData.append("gender", "MALE");
    formData.append("phoneNumber", "08123456789");
    formData.append("companyName", "Questify");

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
      },
      expires: new Date().toISOString(),
    } as Session;

    // Mock
    (auth as jest.Mock).mockResolvedValue(session);
    const expectedResponse = {
      data: {
        statusCode: 400,
        message: "Failed",
        data: {},
      },
    };
    mockedAxios.patch.mockResolvedValue(expectedResponse);

    const result = await updateProfile(undefined, formData);
    expect(result).toEqual({
      message: "Failed to update profile",
    });
  });
});

describe("Create Report", () => {
  it("should create report with valid information", async () => {
    const expectedResponse = {
      status: 200,
    };
    mockedAxios.post.mockResolvedValue(expectedResponse);

    const response = await createReport({
      reportToId: "2dfe14d5-85a8-45d3-8e69-a9955e98dd09",
      formId: "eaf76e52-4d64-4085-a6d1-c7058d402d40",
      message: "creatornya gk jelas",
    });

    expect(response).toBeUndefined();
  });

  it("should return error message when creating report with invalid information", async () => {
    const expectedResponse = {
      status: 400,
    };
    mockedAxios.post.mockResolvedValue(expectedResponse);

    const response = await createReport({
      reportToId: "2dfe14d5-85a8-45d3-8e69-a9955e98dd09",
      formId: "eaf76e52-4d64-4085-a6d1-c7058d402d40",
      message: "creatornya gk jelas",
    });

    expect(response).toEqual({ message: "Failed to create report" });
  });
});
