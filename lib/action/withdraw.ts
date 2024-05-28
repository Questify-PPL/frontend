"use server";

import { auth } from "@/auth";
import { URL } from "@/lib/constant";

export async function createWithdrawal(data: any[]) {
  const session = await auth();
  const user = session?.user;
  const request = {
    amount: data[0],
    payment: data[1],
    accountNumber: data[2],
  };

  const response = await fetch(URL.createWithdrawal, {
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(request),
  });

  if (response.status !== 201) {
    const errorData = await response.json();
    const errorMessage = errorData.message || "Failed to create withdrawal";
    throw new Error(errorMessage);
  }
}

export async function getWithdrawals() {
  const session = await auth();
  const user = session?.user;

  const response = await fetch(URL.getWithdrawal, {
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
    method: "GET",
  });

  if (response.status !== 200) {
    const errorData = await response.json();
    const errorMessage = errorData.message || "Failed to get withdrawals";
    throw new Error(errorMessage);
  }

  return await response.json();
}
