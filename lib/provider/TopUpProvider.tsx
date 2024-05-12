import { useMemo, useState } from "react";
import { TopUpContext, TopUpContextValue } from "../context/TopUpContext";
import { InvoiceItem, TopUpProps } from "../types/topup.type";

type TopUpProviderProps = {
  children: React.ReactNode;
} & TopUpProps;

export function TopUpProvider({
  children,
  invoiceItems,
  session,
}: Readonly<TopUpProviderProps>) {
  const [chosenShopItem, setChosenShopItem] = useState<InvoiceItem | undefined>(
    undefined,
  );

  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const topUpContextValue: TopUpContextValue & TopUpProps = useMemo(() => {
    return {
      chosenShopItem: chosenShopItem,
      setChosenShopItem,
      isLoading,
      isOpen,
      setIsOpen,
      invoiceItems,
      session,
    };
  }, [chosenShopItem, isLoading, isOpen, invoiceItems, session]);

  return (
    <TopUpContext.Provider value={topUpContextValue}>
      {children}
    </TopUpContext.Provider>
  );
}
