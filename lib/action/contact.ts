"use server";

import { auth } from "@/auth";
import { URL } from "@/lib/constant";
import { ContactData } from "../types";

export async function sendContactForm(contactData: ContactData) {
  const session = await auth();
  const user = session?.user;

  const response = await fetch(URL.sendContactData, {
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(contactData),
  });

  if (response.status !== 201) {
    throw new Error("Internal server error");
  }

  return await response.json();
}
