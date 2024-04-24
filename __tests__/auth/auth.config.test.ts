import {
  authConfig,
  blockedPageRoute,
  homepageRoute,
  additionalInfoRoute,
} from "@/auth.config";
import { UserRole, UserRoleEnum } from "@/lib/types/auth/user";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

NextResponse.redirect = jest.fn();
Response.redirect = jest.fn();

beforeEach(() => {
  (NextResponse.redirect as jest.Mock).mockClear();
});
describe("authConfig", () => {
  describe("authorize", () => {
    it("should allow access for root /", () => {
      const url = "https://localhost:3000/";
      const nextRequest = new NextRequest(new Request(url), {});

      jest
        .spyOn(nextRequest, "nextUrl", "get")
        .mockReturnValue(new NextURL(url));

      expect(
        authConfig.callbacks.authorized({
          auth: null,
          request: nextRequest,
        }),
      ).toBeTruthy();
    });

    it("should allow access for public route", () => {
      const url = "https://localhost:3000/login";
      const nextRequest = new NextRequest(new Request(url), {});

      jest
        .spyOn(nextRequest, "nextUrl", "get")
        .mockReturnValue(new NextURL(url));

      expect(
        authConfig.callbacks.authorized({
          auth: null,
          request: nextRequest,
        }),
      ).toBeTruthy();
    });

    it("should reject access for protected route", () => {
      const url = "https://localhost:3000/protected";
      const nextRequest = new NextRequest(new Request(url), {});

      jest
        .spyOn(nextRequest, "nextUrl", "get")
        .mockReturnValue(new NextURL(url));

      expect(
        authConfig.callbacks.authorized({
          auth: null,
          request: nextRequest,
        }),
      ).toBe(false);
    });

    it("should allow access for authenticated user to protected route", () => {
      const url = "https://localhost:3000/protected";
      const nextRequest = new NextRequest(new Request(url), {});

      jest
        .spyOn(nextRequest, "nextUrl", "get")
        .mockReturnValue(new NextURL(url));

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
          hasCompletedProfile: true,
          accessToken: "",
        },
        expires: new Date().toISOString(),
      };

      expect(
        authConfig.callbacks.authorized({
          auth: session,
          request: nextRequest,
        }),
      ).toBeTruthy();
    });

    it("should redirect authenticated user when accessing /login again", () => {
      const url = "https://localhost:3000/login";
      const nextRequest = new NextRequest(new Request(url), {});

      jest
        .spyOn(nextRequest, "nextUrl", "get")
        .mockReturnValue(new NextURL(url));

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
          hasCompletedProfile: true,
          accessToken: "",
        },
        expires: new Date().toISOString(),
      };

      authConfig.callbacks.authorized({
        auth: session,
        request: nextRequest,
      });

      const redirectMock = NextResponse.redirect as jest.Mock;
      expect(redirectMock).toHaveBeenCalled();

      const redirectCallArgument = redirectMock.mock.calls[0][0];
      expect(redirectCallArgument.pathname).toBe(homepageRoute);
    });

    it("should redirect authenticated user when accessing /register", () => {
      const url = "https://localhost:3000/register";
      const nextRequest = new NextRequest(new Request(url), {});

      jest
        .spyOn(nextRequest, "nextUrl", "get")
        .mockReturnValue(new NextURL(url));

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
          hasCompletedProfile: true,
          accessToken: "",
        },
        expires: new Date().toISOString(),
      };

      authConfig.callbacks.authorized({
        auth: session,
        request: nextRequest,
      });

      const redirectMock = NextResponse.redirect as jest.Mock;
      expect(redirectMock).toHaveBeenCalled();

      const redirectCallArgument = redirectMock.mock.calls[0][0];
      expect(redirectCallArgument.pathname).toBe(homepageRoute);
    });

    it("should allow authenticated user with valid role", () => {
      const url = "https://localhost:3000/creator";
      const nextRequest = new NextRequest(new Request(url), {});

      jest
        .spyOn(nextRequest, "nextUrl", "get")
        .mockReturnValue(new NextURL(url));

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
          hasCompletedProfile: true,
          accessToken: "",
        },
        expires: new Date().toISOString(),
      };

      expect(
        authConfig.callbacks.authorized({
          auth: session,
          request: nextRequest,
        }),
      ).toBeTruthy();
    });

    it("should disallow authenticated user with invalid role", () => {
      const url = "https://localhost:3000/admin";
      const nextRequest = new NextRequest(new Request(url), {});

      jest
        .spyOn(nextRequest, "nextUrl", "get")
        .mockReturnValue(new NextURL(url));

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
          hasCompletedProfile: true,
          accessToken: "",
        },
        expires: new Date().toISOString(),
      };

      expect(
        authConfig.callbacks.authorized({
          auth: session,
          request: nextRequest,
        }),
      ).toBeFalsy();
    });
    it("should disallow authenticated user with invalid active role", () => {
      const url = "https://localhost:3000/admin";
      const nextRequest = new NextRequest(new Request(url), {});

      jest
        .spyOn(nextRequest, "nextUrl", "get")
        .mockReturnValue(new NextURL(url));

      const session = {
        user: {
          email: "questify@gmail.com",
          id: "1",
          roles: ["ADMIN", "CREATOR"] as UserRole[],
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
          hasCompletedProfile: true,
          activeRole: UserRoleEnum.Creator,
          accessToken: "",
        },
        expires: new Date().toISOString(),
      };

      expect(
        authConfig.callbacks.authorized({
          auth: session,
          request: nextRequest,
        }),
      ).toBeFalsy();
    });

    it("should disallow non-blocked user accessing /blocked page", () => {
      const url = "https://localhost:3000/blocked";
      const nextRequest = new NextRequest(new Request(url), {});

      jest
        .spyOn(nextRequest, "nextUrl", "get")
        .mockReturnValue(new NextURL(url));

      const session = {
        user: {
          email: "questify@gmail.com",
          id: "1",
          roles: ["ADMIN", "CREATOR"] as UserRole[],
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
          hasCompletedProfile: true,
          activeRole: UserRoleEnum.Creator,
          accessToken: "",
        },
        expires: new Date().toISOString(),
      };

      expect(
        authConfig.callbacks.authorized({
          auth: session,
          request: nextRequest,
        }),
      ).toBeFalsy();
    });
  });

  it("should redirect blocked user to /blocked page", () => {
    const url = "https://localhost:3000/home";
    const nextRequest = new NextRequest(new Request(url), {});

    jest.spyOn(nextRequest, "nextUrl", "get").mockReturnValue(new NextURL(url));

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
        isBlocked: true,
        hasCompletedProfile: true,
        accessToken: "",
      },
      expires: new Date().toISOString(),
    };

    authConfig.callbacks.authorized({
      auth: session,
      request: nextRequest,
    });

    const redirectMock = NextResponse.redirect as jest.Mock;
    expect(redirectMock).toHaveBeenCalled();

    const redirectCallArgument = redirectMock.mock.calls[0][0];
    expect(redirectCallArgument.pathname).toBe(blockedPageRoute);
  });

  it("should redirect authenticated user that has completed profile when accessing /additional-info again", () => {
    const url = "https://localhost:3000/additional-info";
    const nextRequest = new NextRequest(new Request(url), {});

    jest.spyOn(nextRequest, "nextUrl", "get").mockReturnValue(new NextURL(url));

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
        hasCompletedProfile: true,
        accessToken: "",
      },
      expires: new Date().toISOString(),
    };

    authConfig.callbacks.authorized({
      auth: session,
      request: nextRequest,
    });

    const redirectMock = NextResponse.redirect as jest.Mock;
    expect(redirectMock).toHaveBeenCalled();

    const redirectCallArgument = redirectMock.mock.calls[0][0];
    expect(redirectCallArgument.pathname).toBe(homepageRoute);
  });

  it("should redirect authenticated user that has not completed profile to /additional-info", () => {
    const url = "https://localhost:3000/home";
    const nextRequest = new NextRequest(new Request(url), {});

    jest.spyOn(nextRequest, "nextUrl", "get").mockReturnValue(new NextURL(url));

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
        accessToken: "",
      },
      expires: new Date().toISOString(),
    };

    authConfig.callbacks.authorized({
      auth: session,
      request: nextRequest,
    });

    const redirectMock = NextResponse.redirect as jest.Mock;
    expect(redirectMock).toHaveBeenCalled();

    const redirectCallArgument = redirectMock.mock.calls[0][0];
    expect(redirectCallArgument.pathname).toBe(additionalInfoRoute);
  });

  describe("jwt", () => {
    it("should return token", async () => {
      const token = {};

      await expect(
        authConfig.callbacks.jwt({
          token: token,
          user: {},
          account: null,
        }),
      ).resolves.toBe(token);
    });

    it("should return token with user attribute", async () => {
      const token = {};
      const user = {
        email: "questify@gmail.com",
      };

      const returnedToken = await authConfig.callbacks.jwt({
        token: token,
        user: user,
        account: null,
      });

      expect(returnedToken.email).toBe(user.email);
    });

    it("should return updated user attribute", async () => {
      const token = {};
      const user = {
        email: "questify@gmail.com",
      };

      const returnedToken = await authConfig.callbacks.jwt({
        token: token,
        user: user,
        account: null,
        trigger: "update",
        session: {
          user: {
            activeRole: UserRoleEnum.Respondent,
          },
        },
      });

      expect(returnedToken.activeRole).toBe(UserRoleEnum.Respondent);
    });
  });

  describe("session", () => {
    it("should return session", async () => {
      const session = {
        user: { name: "", email: "", image: "", id: "", roles: [] },
        expires: new Date().toISOString(),
      };
      const token = {};

      const returnedSession = await authConfig.callbacks.session({
        // @ts-expect-error
        session,
        token,
      });
      expect(returnedSession).toBe(session);
    });

    it("should return session with token attribute", async () => {
      const session = {
        user: { name: "", email: "", image: "", id: "", roles: [] },
        expires: new Date().toISOString(),
      };
      const token = {
        accessToken: "token",
      };

      const returnedSession = await authConfig.callbacks.session({
        // @ts-expect-error
        session,
        token,
      });

      // @ts-ignore
      expect(returnedSession.user?.accessToken).toBe(token.accessToken);
    });

    it("should return session with respondent active role for SSO UI", async () => {
      const session = {
        user: { name: "", email: "", image: "", id: "UI" },
        expires: new Date().toISOString(),
      };
      const token = {
        accessToken: "token",
      };

      const returnedSession = await authConfig.callbacks.session({
        // @ts-expect-error
        session,
        token,
      });

      // @ts-ignore
      expect(returnedSession.user.activeRole).toBe(UserRoleEnum.Respondent);
    });

    it("should return session with creator active role for Creator", async () => {
      const session = {
        user: {
          name: "",
          email: "",
          image: "",
          id: "",
          roles: [UserRoleEnum.Creator],
        },
        expires: new Date().toISOString(),
      };
      const token = {
        accessToken: "token",
      };

      const returnedSession = await authConfig.callbacks.session({
        // @ts-expect-error
        session,
        token,
      });

      // @ts-ignore
      expect(returnedSession.user.activeRole).toBe(UserRoleEnum.Creator);
    });
  });

  describe("redirect", () => {
    it("should allows relative callback URLs", async () => {
      const url = "/path";
      const baseUrl = "http://localhost:3000";
      const returnedUrl = await authConfig.callbacks.redirect({
        url,
        baseUrl,
      });

      expect(returnedUrl).toBe(`${baseUrl}${url}`);
    });

    it("should allows callback URLs on the same origin", async () => {
      const url = "http://localhost:3000/origin";
      const baseUrl = "http://localhost:3000";
      const returnedUrl = await authConfig.callbacks.redirect({
        url,
        baseUrl,
      });

      expect(returnedUrl).toBe(url);
    });

    it("should redirect /login to homepage", async () => {
      const url = "http://localhost:3000/login";
      const baseUrl = "http://localhost:3000";
      const returnedUrl = await authConfig.callbacks.redirect({
        url,
        baseUrl,
      });

      expect(returnedUrl).toBe(homepageRoute);
    });

    it("should redirect /login to callback url", async () => {
      const callbackUrl = "http://localhost:3000/profile";
      const url = `http://localhost:3000/login?callbackUrl=${callbackUrl}`;
      const baseUrl = "http://localhost:3000";
      const returnedUrl = await authConfig.callbacks.redirect({
        url,
        baseUrl,
      });

      expect(returnedUrl).toBe(callbackUrl);
    });

    it("should allow redirect to SSO url", async () => {
      const baseUrl = "http://localhost:3000";
      const url = `https://sso.ui.ac.id/cas2/logout?url=${baseUrl}`;
      const returnedUrl = await authConfig.callbacks.redirect({
        url,
        baseUrl,
      });

      expect(returnedUrl).toBe(url);
    });
  });
});
