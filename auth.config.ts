import type { NextAuthConfig } from "next-auth";
import { UserRole, UserRoleEnum } from "./lib/types/auth/user";

/**
 * Array to specify public routes. By default, unspecified routes is protected.
 */
export const publicRoutes = ["/login", "/register"];
export const disabledRoutesAfterAuthenticated = ["/login", "/register"];
export const homepageRoute = "/home";

/**
 * Array to specify which routes should be accessed with appropritae role
 */
export const RBACRoutes = {
  CREATOR: ["/create", "/create/form/[id]"],
  RESPONDENT: ["/questionnaire"],
  ADMIN: ["/admin", "/reports", "/reviews"],
} as Record<UserRole, string[]>;

const ssoLogoutUrl = "https://sso.ui.ac.id/cas2/logout";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // Root
      if (nextUrl.pathname === "/") return true;

      // Disable route for authenticated user
      const isAuthDisabledRoute = disabledRoutesAfterAuthenticated.some(
        (route) => nextUrl.pathname.startsWith(route),
      );
      const isLoggedIn = !!auth?.user;

      if (isAuthDisabledRoute && isLoggedIn) {
        return Response.redirect(new URL(homepageRoute, nextUrl));
      }

      // Public routes
      const isPublic = publicRoutes.some((route) =>
        nextUrl.pathname.startsWith(route),
      );
      if (isPublic) return true;

      // Check role
      let hasAccess = false;
      let requiredRole = false;

      if (isLoggedIn) {
        const user = auth.user;

        hasAccess = Object.entries(RBACRoutes).some(([role, routes]) => {
          return routes.some((route) => {
            if (!nextUrl.pathname.startsWith(route)) return false;

            const hasRole = user.roles.includes(role as UserRole);
            const isActiveRole = role === user.activeRole;
            requiredRole = true;

            return hasRole && isActiveRole;
          });
        });
      }

      return requiredRole ? hasAccess : isLoggedIn;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        Object.entries(user).forEach(([key, value]) => {
          token[key] = value;
        });
      }

      // Update user data
      if (trigger === "update" && session?.user) {
        const updatedUserData = session.user;

        Object.entries(updatedUserData).forEach(([key, value]) => {
          token[key] = value;
        });
      }

      return token;
    },
    async session({ session, token }) {
      Object.entries(token).forEach(([key, value]) => {
        // @ts-ignore
        session.user[key] = value;
      });

      // Set active role
      if (!session.user.activeRole && session.user.id.startsWith("UI")) {
        session.user.activeRole = UserRoleEnum.Respondent;
      } else if (!session.user.activeRole && session.user.roles.length == 1) {
        const [role] = session.user.roles;
        session.user.activeRole = role;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;

      const urlObj = new URL(url);

      // Redirect /login to homepage
      if (urlObj.pathname === "/login") {
        const urlObj = new URL(url);
        const hasCallbackUrl = urlObj.searchParams.has("callbackUrl");
        const callbackUrl = urlObj.searchParams.get("callbackUrl") as string;

        return hasCallbackUrl ? callbackUrl : homepageRoute;
      }

      // Allows redirect to SSO
      if (url.startsWith(ssoLogoutUrl)) {
        return url;
      }

      // Allows callback URLs on the same origin
      else if (urlObj.origin === baseUrl) return url;

      return baseUrl;
    },
  },
  providers: [],
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60, // 4 hours
  },
} satisfies NextAuthConfig;
