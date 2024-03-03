"use server";

import { auth, signIn, signOut } from "@/auth";
import { Session, AuthError } from "next-auth";
import { logoutUrl as ssoLogoutUrl } from "../services";

const logoutRedirectUrl = "/";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return "Something went wrong";
      }
    }
    throw error;
  }
}

export async function logout() {
  const session = (await auth()) as Session;
  const useSSO = session.user.id.startsWith("UI");
  const redirectOption = {
    redirectTo: useSSO ? ssoLogoutUrl : logoutRedirectUrl,
  };

  await signOut(redirectOption);
}
