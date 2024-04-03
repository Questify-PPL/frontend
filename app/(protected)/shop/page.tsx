import { auth } from "@/auth";
import ShopWrapper from "@/components/shop/ShopWrapper";
import { getShopData } from "@/lib/action";
import { ShopFetchResponse } from "@/lib/types";

export default async function Shop() {
  const session = await auth();
  const { shopItems, vouchers } = await fetchShopItems();

  async function fetchShopItems() {
    let data = {} as ShopFetchResponse;
    try {
      data = await getShopData();
    } catch (error) {}

    return data;
  }

  return (
    <ShopWrapper shopItems={shopItems} vouchers={vouchers} session={session} />
  );
}
