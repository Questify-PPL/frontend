import { Card } from "@/components/ui/card";
import { useShopContext } from "@/lib/context";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { LuChevronRight, LuCoins, LuTag } from "react-icons/lu";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { VoucherPick } from "./VoucherPick";
import { Loader2 } from "lucide-react";

export function PurchaseCard() {
  const {
    chosenShopItem,
    chosenVoucher,
    vouchers,
    session,
    setIsOpen,
    isLoading,
  } = useShopContext();

  return (
    <>
      {chosenShopItem && (
        <div className="fixed bottom-0 flex justify-center  w-full p-4 shadow-md z-10">
          <Card className="min-w-full md:min-w-[60%] max-w-2xl h-fit mt-5 p-2.5 md:w-1/2">
            <Collapsible defaultOpen={true}>
              <CollapsibleTrigger asChild className="cursor-pointer">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row justify-between p-0.5 flex-1 items-center">
                    <div className="flex flex-col">
                      <div className="font-light text-[#95B0B4] text-xs">
                        Credit Balance
                      </div>
                      <div className="flex flex-row mt-px">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#E2B720] bg-opacity-10 ml-1">
                          <LuCoins className="text-[#E2B720] p-0.5 w-5 h-5"></LuCoins>
                        </div>
                        <div className="ml-1 text-[#1D2425] font-bold">
                          {session?.user.credit}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <div className=" text-[#95B0B4] font-light text-xs">
                        Top up
                      </div>
                      <LuChevronRight className="text-[#95B0B4]"></LuChevronRight>
                    </div>
                  </div>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <Separator className="border-t-2 my-1 text-[#E5EEF0] mb-3"></Separator>

                <div className="flex flex-row justify-between">
                  <div className="bg-[#F9EBF6] w-fit h-fit flex flex-row rounded-lg py-1 px-2">
                    <LuTag className="text-[#C036A9] h-fit w-2.5 font-bold mt-0.5"></LuTag>
                    <div className="font-bold text-[#C036A9] text-[10px] ml-1">
                      {chosenVoucher
                        ? `Rp.${chosenVoucher.discount} off your purchase`
                        : ` ${vouchers.length} promo(s) for you`}
                    </div>
                  </div>

                  <VoucherPick />
                </div>

                <Separator className="border-t-2 my-1 text-[#E5EEF0] mt-3"></Separator>

                <div className="flex flex-row justify-between mt-3">
                  <div className="flex flex-col">
                    <div className="text-[#95B0B4] font-light text-sm">
                      Total
                    </div>
                    <div className="flex flex-row">
                      <div className="text-xs text-[#32636A]">
                        You &apos;ve saved{" "}
                      </div>
                      <div className="w-4 h-4 rounded-full flex items-center justify-center bg-[#E2B720] bg-opacity-10 ml-1">
                        <LuCoins className="text-[#E2B720] p-0.5"></LuCoins>
                      </div>
                      <div className="text-xs text-[#32636A] font-bold ml-1">
                        {chosenShopItem.advertisedOriginalPrice -
                          chosenShopItem.price -
                          (chosenVoucher?.discount ?? 0)}{" "}
                        !
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row mt-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#E2B720] bg-opacity-10">
                      <LuCoins className="w-5 h-5 text-[#E2B720] p-0.5"></LuCoins>
                    </div>
                    <div className="ml-1 text-base text-[#1D2425] font-bold">
                      {chosenShopItem.price - (chosenVoucher?.discount ?? 0)}
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  disabled={isLoading}
                  className="bg-primary text-white w-full mt-3"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Purchase"
                  )}
                </Button>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        </div>
      )}
    </>
  );
}
