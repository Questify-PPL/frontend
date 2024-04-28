import { createContext, useContext } from "react";
import { ShopItem, ShopProps } from "../types";
import { InvoiceItem, TopUpProps } from "../types/topup.type";

export type TopUpContextValue = TopUpProps & {
  chosenShopItem: InvoiceItem | undefined;
  // eslint-disable-next-line no-unused-vars
  setChosenShopItem: (item: InvoiceItem | undefined) => void;

  isLoading: boolean;

  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (isOpen: boolean) => void;
};

export const TopUpContext = createContext({} as TopUpContextValue);

export function useTopUpContext() {
  const context = useContext(TopUpContext);

  if (!context) {
    throw new Error("useTopUpContext must be used within a TopUpProvider");
  }

  return context;
}
