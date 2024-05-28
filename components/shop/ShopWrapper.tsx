"use client";

import { ShopProvider } from "@/lib/provider/ShopProvider";
import { ShopProps } from "@/lib/types";
import {
  ItemShowcase,
  PurchaseCard,
  PurchaseConfirmationModal,
  ShopInfoTable,
} from ".";

export default function ShopWrapper(props: Readonly<ShopProps>) {
  return (
    <ShopProvider {...props}>
      <div className="p-2 mt-10 flex flex-col items-center justify-center">
        <div className="flex flex-col mb-2 items-center">
          <span className="text-[#1D2425] font-semibold text-base">
            Basic Plans
          </span>
          <span className="text-[#95B0B4] font-sm text-xs">
            The form has no expiry date
          </span>
        </div>
        <ItemShowcase />
        <PurchaseCard />

        <div className="flex flex-col mt-10 items-center">
          <span className="text-[#1D2425] font-semibold text-base">
            Purchase History
          </span>
          <span className="text-[#95B0B4] font-sm text-xs">
            Forms you have bought
          </span>
        </div>

        <div className="justify-center md:flex-row items-center flex h-full w-full">
          <ShopInfoTable />
        </div>

        <PurchaseConfirmationModal />
      </div>
    </ShopProvider>
  );
}
