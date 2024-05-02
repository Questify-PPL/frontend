"use server";

import { auth, unstable_update as update } from "@/auth";
import { URL } from "../constant";
import { ErrorReponse } from "../types/response";

export async function getInvoiceCreator() {
  const session = await auth();
  const user = session?.user;

  const response = await fetch(URL.topUpCreator, {
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const res = await response.json();

  if (response.status > 400) {
    throw new Error(res.message);
  }

  return res;
}

export async function processTopUp(formData: FormData) {
  {
    try {
      const session = await auth();
      console.log(formData.get("amount"));
      console.log(formData.get("buktiPembayaran"));

      const response = await fetch(URL.processTopUp, {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
        method: "POST",
        body: formData,
      });

      const res = await response.json();
      // const res = {
      //   statusCode: 201,
      //   message: "Successfully create topup invoice",
      //   data: {},
      // };

      if (response.status > 400) {
        throw new Error(res.message);
      }

      return res;
    } catch (error) {
      return { error: (error as ErrorReponse).message };
    }
  }
}
