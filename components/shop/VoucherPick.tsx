import { LuChevronRight } from "react-icons/lu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { useShopContext } from "@/lib/context";

export function VoucherPick() {
  const { setChosenVoucher, chosenVoucher, vouchers } = useShopContext();

  return (
    <Drawer>
      <DrawerTrigger>
        <div className="flex flex-row cursor-pointer">
          <div className="mt-1 text-[#95B0B4] font-light text-xs">
            Use Voucher
          </div>
          <LuChevronRight className="mt-1 text-[#95B0B4]"></LuChevronRight>
        </div>
        <DrawerContent
          className="flex flex-col items-center px-4"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <DrawerHeader className="flex flex-col items-center">
            <DrawerTitle>Vouchers for you!</DrawerTitle>
            <DrawerDescription>
              Pick your voucher and get a discount!
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-row justify-between md:w-3/5 w-full">
            {vouchers.map((voucher, index) => (
              <div
                key={`${voucher.expiredAt}-${index}`}
                className="flex flex-row justify-between w-full mt-3"
              >
                <div className="flex flex-row">
                  <div className="flex flex-col">
                    <div className="text-[#1D2425] font-bold">
                      Voucher {index + 1}
                    </div>
                    <div className="text-[#95B0B4] text-xs">
                      Rp.{voucher.discount} discount
                    </div>
                  </div>
                </div>
                <DrawerClose className="flex flex-row gap-2">
                  <div
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    role="none"
                    onClick={() => {
                      if (chosenVoucher?.id == voucher.id) {
                        setChosenVoucher(undefined);
                        return;
                      }

                      setChosenVoucher(voucher);
                    }}
                  >
                    {chosenVoucher?.id == voucher.id ? "Remove" : "Pick"}
                  </div>
                </DrawerClose>
              </div>
            ))}
          </div>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </DrawerTrigger>
    </Drawer>
  );
}
