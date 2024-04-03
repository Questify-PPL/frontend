import { Card } from "@/components/ui/card";
import { useShopContext } from "@/lib/context";
import { ShopItem } from "@/lib/types";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import React from "react";
import { LuCheck, LuCoins, LuScroll } from "react-icons/lu";

interface CardProps {
  shopItem: ShopItem;
  imageUrl: string;
}

const ItemCard: React.FC<CardProps> = ({ shopItem, imageUrl }) => {
  const { chosenShopItem, setChosenShopItem } = useShopContext();

  return (
    <Card
      className={`relative min-w-32 h-fit p-3 gap-2  cursor-pointer`}
      onClick={() => {
        if (chosenShopItem?.id == shopItem.id) {
          setChosenShopItem(undefined);
          return;
        }

        setChosenShopItem(shopItem);
      }}
      data-testid="item-card"
    >
      <div className="h-[86px] relative bg-[#E5EEF0] rounded-[4px] flex w-full items-center justify-center text-center">
        <Image
          src={imageUrl}
          alt={shopItem.title}
          width={52.646}
          height={63.176}
        />
      </div>
      <div className="mt-4 flex justify-between">
        <LuScroll className="w-5 h-5 text-[#C036A9]" />
        <span className="text-medium font-bold">{shopItem.title}</span>
      </div>
      <Separator className="border-t-2 my-1" />
      <div className="flex">
        <div className="w-4 h-4 rounded-full flex items-center justify-center bg-[#E2B720] bg-opacity-10 ml-1 mt-1">
          <LuCoins className="text-[#E2B720] p-0.5" />
        </div>
        <div className="flex flex-col ml-1 mt-1">
          <span className="text-xs mb-[-3px]">{shopItem.price}</span>
          <span
            className={`line-through text-xs ${chosenShopItem?.id == shopItem.id ? "text-[#95B0B4]" : "text-[#E24F20]"}`}
          >
            {shopItem.advertisedOriginalPrice}
          </span>
        </div>
      </div>
      {chosenShopItem?.id == shopItem.id && (
        <div className="absolute inset-0 flex items-center justify-center flex-col bg-[#324B4F] bg-opacity-60 rounded-lg">
          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#DDFAD6] ml-1">
            <LuCheck className="text-[#39A014] font-bold p-0.5 w-5 h-5" />
          </div>
          <div className="text-white font-bold">Chosen</div>
        </div>
      )}
    </Card>
  );
};

export default ItemCard;
