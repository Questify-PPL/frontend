import { URL } from "@/lib/constant";
import type { ApiResponse, JWT, User } from "@/lib/types";
import axios, { AxiosError } from "axios";
import { LoginSchema, SSOSchema } from "@/lib/schema";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";

export async function getUserJwt(
  email: string,
  password: string,
): Promise<JWT> {
  const response = (
    await axios.post(URL.login, {
      email,
      password,
    })
  ).data as ApiResponse<JWT>;

  if (response.statusCode !== 200) throw Error("Failed to fetch user");

  return response.data;
}

export async function getUserProfile(accessToken: string): Promise<User> {
  const response = await axios.get<User>(URL.profile, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) throw Error("Failed to fetch user's profile");

  return response.data;
}

export const authCredentials = {
  // @ts-ignore
  async authorize(credentials) {
    try {
      const parsedCredentials = LoginSchema.safeParse(credentials);
      const parserSSOCredentials = SSOSchema.safeParse(credentials);

      let accessToken;

      if (parsedCredentials.success) {
        const { email, password } = parsedCredentials.data;
        const jwt = await getUserJwt(email, password);
        accessToken = jwt.accessToken;
      } else if (parserSSOCredentials.success) {
        const { SSO } = parserSSOCredentials.data;
        accessToken = SSO;
      } else {
        throw new ZodError([
          ...parsedCredentials.error.errors,
          ...parserSSOCredentials.error.errors,
        ]);
      }

      const profile = await getUserProfile(accessToken);

      const user = {
        ...profile,
        accessToken,
      } as User;

      return user;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(`Error: ${error.message}`);
        console.log(`Detail: ${JSON.stringify(error.response?.data)}`);
      } else if (error instanceof ZodError) {
        console.log(`Error: ${error.flatten()}`);
      }

      return null;
    }
  },
};

export const { auth, signIn, signOut, unstable_update } = NextAuth({
  ...authConfig,
  providers: [Credentials(authCredentials)],
});
