"use server";

import { auth, unstable_update as update } from "@/auth";
import { URL } from "../constant";
import { ShopItem, Voucher } from "../types";
import { ErrorReponse } from "../types/response";

export async function getShopData() {
  const session = await auth();
  const user = session?.user;

  const [shopItemsResponse, purchaseHistoryResponse] = await Promise.all([
    await fetch(URL.shop, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    }),
    await fetch(URL.invoice, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    }),
  ]);

  const [shopItems, purchaseHistory] = await Promise.all([
    shopItemsResponse.json(),
    purchaseHistoryResponse.json(),
  ]);

  if (shopItemsResponse.status > 400 || purchaseHistoryResponse.status > 400) {
    throw new Error(shopItems.message || purchaseHistory.message);
  }

  return {
    ...shopItems.data,
    purchaseHistory: purchaseHistory.data,
  };
}

export async function processPurchase(
  chosenShopItem: ShopItem | undefined,
  chosenVoucher: Voucher | undefined,
) {
  try {
    if (!chosenShopItem) {
      return {
        error: "Please choose an item to purchase",
      };
    }
    const session = await auth();

    if (!session?.user.credit) {
      return {
        error: "You have no credit to purchase this item",
      };
    }

    if (session?.user.credit < chosenShopItem.price) {
      return {
        error: "You don't have enough credit to purchase this item",
      };
    }

    // Process purchase
    const response = await fetch(`${URL.shop}/buy`, {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        itemId: chosenShopItem.id,
        ...(chosenVoucher && { voucherId: chosenVoucher.id }),
      }),
    });

    const res = await response.json();

    if (response.status >= 400) {
      throw new Error(res.message);
    }

    await update({
      user: {
        ...session.user,
        credit: res.data.userBalance,
        Creator: {
          ...session.user.Creator!,
          emptyForms: res.data.emptyForms,
        },
      },
    });

    return {
      error: undefined,
      data: res.data,
    };
  } catch (error) {
    return { error: (error as ErrorReponse).message };
  }
}
