"use server";

import { URL } from "../constant";
import { auth } from "@/auth";

export async function markAllAsRead() {
  const session = await auth();
  const user = session?.user;

  const response = await fetch(URL.markAllAsRead, {
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
      "Content-Type": "application/json",
    },
    method: "PATCH",
  });

  if (response.status !== 200) {
    throw new Error("Failed to mark all notification as read");
  }
}
