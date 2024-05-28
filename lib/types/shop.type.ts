import { Session } from "next-auth";

export type ShopProps = {
  shopItems: ShopItem[];
  vouchers: Voucher[];
  session: Session | null;
  purchaseHistory: PurchaseHistory[];
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

export type PurchaseHistory = {
  id: string;
  itemId: number;
  userId: string;

  createdAt: string;
  totalPayment: number;
};

export type ShopFetchResponse = {
  shopItems: ShopItem[];
  vouchers: Voucher[];
  purchaseHistory: PurchaseHistory[];
};

export type UpdateShopState =
  | {
      error: string;
    }
  | undefined;
