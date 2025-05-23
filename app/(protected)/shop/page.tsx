import { auth } from "@/auth";
import ShopWrapper from "@/components/shop/ShopWrapper";
import { getShopData } from "@/lib/action";
import { ShopFetchResponse } from "@/lib/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Questify - Shop",
};

export default async function Shop() {
  const session = await auth();
  const { shopItems, vouchers, purchaseHistory } = await fetchShopItems();

  async function fetchShopItems() {
    let data = {} as ShopFetchResponse;
    try {
      data = await getShopData();
    } catch (error) {}

    return data;
  }

  return (
    <ShopWrapper
      shopItems={shopItems}
      vouchers={vouchers}
      session={session}
      purchaseHistory={purchaseHistory}
    />
  );
}
