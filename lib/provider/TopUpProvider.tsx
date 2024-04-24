import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { InvoiceItem, TopUpProps } from "../types/topup.type";
import { TopUpContext, TopUpContextValue } from "../context/TopUpContext";

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

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const topUpContextValue: TopUpContextValue & TopUpProps = {
    chosenShopItem: chosenShopItem as InvoiceItem | undefined,
    setChosenShopItem,
    isLoading,
    isOpen,
    setIsOpen,
    invoiceItems,
    session,
  };

  return (
    <TopUpContext.Provider value={topUpContextValue}>
      {children}
    </TopUpContext.Provider>
  );
}
