import { SHOP_IMAGE } from "@/lib/constant";
import { useShopContext } from "@/lib/context";
import ItemCard from "./ItemCard";

export function ItemShowcase() {
  const { shopItems } = useShopContext();

  return (
    <div className="flex flex-row h-full w-full md:flex-row items-center justify-center md:gap-8 gap-6 flex-wrap">
      {shopItems?.map((shopItem, index) => (
        <ItemCard
          key={`${shopItem.title}-${index}`}
          shopItem={shopItem}
          imageUrl={SHOP_IMAGE[index]}
        />
      ))}
    </div>
  );
}
