import { useShopContext } from "@/lib/context";

export function ShopInfoTable() {
  const { purchaseHistory, shopItems } = useShopContext();

  return (
    <table className="w-4/5 h-6 mt-2 md:w-1/2 border-b-2 border-x-0 border-t-0 border-[#E5EEF0]">
      <thead>
        <tr className="flex flex-row rounded-lg border bg-card text-card-foreground shadow-sm p-3">
          <th className="flex w-1/2">
            <span className="font-bold text-[#32636A] text-m">Item</span>
          </th>
          <th className="flex w-1/2">
            <span className="font-bold text-[#32636A] text-m">Date</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {purchaseHistory?.toReversed().map((purchase) => (
          <tr
            key={`purchase-history-${purchase.id}`}
            className="flex flex-row p-[10px] items-center justify-center gap-[10px] border-x"
          >
            <td className="flex w-1/2">
              <span className="text-[#1D2425] text-[12px] font-bold leading-normal">
                {shopItems.find((item) => item.id === purchase.itemId)?.title}
              </span>
            </td>
            <td className="flex w-1/2">
              <span className="text-[#1D2425] text-[12px] font-bold leading-normal">
                {new Date(purchase.createdAt).toLocaleString()}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
