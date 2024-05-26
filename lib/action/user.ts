"use server";

import { auth, signIn, signOut, unstable_update as update } from "@/auth";
import { FlattenedUpdateErrors } from "@/lib/schema";
import axios from "axios";
import { AuthError, Session } from "next-auth";
import { ZodError } from "zod";
import { URL } from "../constant";
import { UpdateProfileSchema } from "../schema";
import { CreateReport } from "../schema/create-report.schema";
import { logoutUrl as ssoLogoutUrl } from "../services";
import { ActionReponse } from "../types";
import { UserRole } from "../types/auth";
import { revalidatePath } from "next/cache";

export type UpdateState = FlattenedUpdateErrors | ActionReponse | undefined;

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
  const useSSO = session?.user.id.startsWith("UI");
  const redirectOption = {
    redirectTo: useSSO ? ssoLogoutUrl : logoutRedirectUrl,
  };

  await signOut(redirectOption);
}

export async function changeRole(role: UserRole) {
  const session = (await auth()) as Session;
  const user = session?.user;

  if (user && user.roles.includes(role)) {
    await update({
      user: {
        activeRole: role,
      },
    });
  }
}

export async function getCurrentSession() {
  const session = (await auth()) as Session;

  return session;
}

export async function getUserCredit() {
  const session = (await auth()) as Session;
  const user = session?.user;

  return user?.credit || 0;
}

export async function updateProfile(
  prevState: UpdateState,
  formData: FormData,
) {
  try {
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      birthDate: formData.get("birthDate"),
      gender: formData.get("gender"),
      phoneNumber: formData.get("phoneNumber"),
      companyName: formData.get("companyName"),
    };
    const parsedFormData = UpdateProfileSchema.parse(data);

    const session = await auth();
    const user = session?.user;

    const response = await axios.patch(
      URL.updateProfile,
      {
        fullName: `${parsedFormData.firstName} ${parsedFormData.lastName}`,
        phoneNumber: parsedFormData.phoneNumber,
        gender: parsedFormData.gender,
        companyName: parsedFormData.companyName,
        birthDate: parsedFormData.birthDate,
        hasCompletedProfile: true,
      },
      {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status !== 200) {
      throw new Error("Failed to update profile");
    }

    await update({
      user: {
        firstName: parsedFormData.firstName,
        lastName: parsedFormData.lastName,
        phoneNumber: parsedFormData.phoneNumber,
        gender: parsedFormData.gender,
        companyName: parsedFormData.companyName,
        birthDate: parsedFormData.birthDate.toISOString(),
        hasCompletedProfile: true,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return error.flatten();
    } else {
      return { message: "Failed to update profile" };
    }
  }
}

export async function createReport(createReport: CreateReport) {
  try {
    const parsedData = CreateReport.parse(createReport);

    const session = await auth();
    const user = session?.user;

    const response = await axios.post(
      URL.report.create,
      {
        reportToId: parsedData.reportToId,
        formId: parsedData.formId,
        message: parsedData.message,
      },
      {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status !== 201) {
      throw new Error("Failed to create report");
    }
  } catch (error) {
    return { message: "Failed to create report" };
  }

  revalidatePath("/");
}
