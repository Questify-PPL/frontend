import { Session } from "next-auth";

export type ShopProps = {
  shopItems: ShopItem[];
  vouchers: Voucher[];
  session: Session | null;
};

export type ShopItem = {
  id: number;
  title: string;
  price: number;
  category: string;
  advertisedOriginalPrice: number;
  description: string;
};

export type Voucher = {
  id: string;
  discount: number;
  expiredAt: string;
  isUsed: boolean;
  usedAt: string;
  userId: string | null;
  usedItemId: number | null;
  createdAt: string;
  updatedAt: string;
};

export type ShopFetchResponse = {
  shopItems: ShopItem[];
  vouchers: Voucher[];
};

export type UpdateShopState =
  | {
      error: string;
    }
  | undefined;
