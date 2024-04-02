import ItemCard from "@/components/shop/ItemCard";
import InfoTable from "@/components/shop/InfoTable";
import ItemCard from "@/components/shop/ItemCard" 
import ShopInfoTable from "@/components/shop/ShopInfoTable" 
import PurchaseCard from "@/components/shop/PurchaseCard";
import { LuCheck } from "react-icons/lu";

export default function Shop() {
  return (
    <div className="p-2 mt-10">
      <div className="flex flex-col mb-2">
        <span className="text-[#1D2425] font-semibold text-base">
          Basic Plans
        </span>
        <span className="text-[#95B0B4] font-sm text-xs">
          The form has no expiry date
        </span>
      </div>
      <div className="flex flex-row h-full w-full  gap-2">
        <ItemCard
          label="1 Form"
          cost="25.000"
          discCost="27.000"
          imageUrl=""
        ></ItemCard>
        <ItemCard
          label="3 Form"
          cost="70.000"
          discCost="81.000"
          imageUrl=""
        ></ItemCard>
        <ItemCard
          label="5 Form"
          cost="110.000"
          discCost="135.000"
          imageUrl=""
        ></ItemCard>
        <ItemCard
          label="10 Form"
          cost="200.000"
          discCost="270.000"
          imageUrl=""
        ></ItemCard>
      </div>
      <div className="flex flex-col mt-10">
        <span className="text-[#1D2425] font-semibold text-base">
          Purchase History
        </span>
        <span className="text-[#95B0B4] font-sm text-xs">
          Forms you have bought
        </span>
      </div>

      <InfoTable></InfoTable>
    </div>
  );
}

            <ShopInfoTable></ShopInfoTable>

            <PurchaseCard balance={0} promo={0} price={0}></PurchaseCard>



        
        </div>

      );
}