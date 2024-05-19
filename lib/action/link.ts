"use server";

import { auth } from "@/auth";
import { URL } from "../constant";

export async function getLinkMapping(link: string) {
  const session = await auth();
  const user = session?.user;

  const response = await fetch(URL.getLinkMapping(link), {
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  if (response.status !== 200) {
    throw new Error("Failed to get link mapping");
  }

  return await response.json();
}
