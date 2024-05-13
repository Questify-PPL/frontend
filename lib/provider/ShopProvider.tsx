import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { processPurchase } from "../action";
import { ShopContext } from "../context";
import { ShopItem, ShopProps, Voucher } from "../types";

type SummaryProviderProps = {
  children: React.ReactNode;
} & ShopProps;

export function ShopProvider({
  children,
  shopItems,
  vouchers,
  session,
}: Readonly<SummaryProviderProps>) {
  const [chosenShopItem, setChosenShopItem] = useState<ShopItem | undefined>(
    undefined,
  );

  const [chosenVoucher, setChosenVoucher] = useState<Voucher | undefined>(
    undefined,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const processPurchasement = useMemo(() => {
    return async function () {
      setIsLoading(true);
      const { error } = await processPurchase(chosenShopItem, chosenVoucher);

      if (error) {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
        return;
      } else {
        toast({
          title: "Success",
          description: "You have successfully purchased the item",
        });

        router.refresh();
      }
      setIsLoading(false);
    };
  }, [chosenShopItem, chosenVoucher, router, toast]);

  const returns = useMemo(() => {
    return {
      shopItems,
      vouchers,
      chosenShopItem,
      setChosenShopItem,
      session,
      chosenVoucher,
      setChosenVoucher,
      isLoading,
      processPurchasement,
      isOpen,
      setIsOpen,
    };
  }, [
    shopItems,
    vouchers,
    chosenShopItem,
    session,
    chosenVoucher,
    isLoading,
    processPurchasement,
    isOpen,
  ]);

  return (
    <ShopContext.Provider value={returns}>{children}</ShopContext.Provider>
  );
}
