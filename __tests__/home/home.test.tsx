import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HomeLayout from "@/app/(protected)/layout";
import React from "react";
import Home from "@/app/(protected)/home/page";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { UserRole } from "@/lib/types/auth";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
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

jest.mock("@/auth", () => {
  return {
    __esModule: true,
    auth: jest.fn(),
  };
});

describe("Login", () => {
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
        credit: null,
        isVerified: true,
        isBlocked: false,
        hasCompletedProfile: false,
        activeRole: "CREATOR",
      },
      expires: new Date().toISOString(),
    } as Session;

    (auth as jest.Mock).mockResolvedValue(session);

    render(await Home());

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Create QRE")).toBeInTheDocument();
    expect(screen.getByText("Responses")).toBeInTheDocument();

    expect(screen.getByText("empty forms")).toBeInTheDocument();
    expect(screen.getByText("credits")).toBeInTheDocument();
  });
});
