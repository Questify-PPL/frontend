"use client";

import { createContext, useContext } from "react";
import { PurchaseHistory, ShopItem, ShopProps, Voucher } from "../types";

export type ShopContextValue = ShopProps & {
  chosenShopItem: ShopItem | undefined;
  // eslint-disable-next-line no-unused-vars
  setChosenShopItem: (item: ShopItem | undefined) => void;
  chosenVoucher: Voucher | undefined;
  // eslint-disable-next-line no-unused-vars
  setChosenVoucher: (voucher: Voucher | undefined) => void;
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  processPurchasement: () => Promise<void>;

  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (isOpen: boolean) => void;

  purchaseHistory: PurchaseHistory[];
  // eslint-disable-next-line no-unused-vars
  setPurchaseHistory: (purchaseHistory: PurchaseHistory[]) => void;
};

export const ShopContext = createContext({} as ShopContextValue);

export function useShopContext() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShopContext must be used within a ShopProvider");
  }

  return context;
}
