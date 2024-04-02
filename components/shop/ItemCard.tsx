'use client'

import React, {useState} from "react";
import { Card } from "@/components/ui/card";
import { LuScroll, LuCoins, LuCheck } from "react-icons/lu";
import { Separator } from "@radix-ui/react-dropdown-menu";
import PurchaseCard from "./PurchaseCard"; // Import the PurchaseCard component

interface CardProps {
  label: string;
  cost: string;
  discCost: string;
  imageUrl: string;
}

  const ItemCard: React.FC<CardProps> = ({ label, cost, discCost, imageUrl }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleCardClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <Card
      className={`relative min-w-28 h-40 p-3 gap-2 ${isSelected ? 'bg-[#324B4F] bg-opacity-60' : ''} cursor-pointer`}
      onClick={handleCardClick}
      data-testid="item-card"
    >
      <div className="min-w-21 h-20 rounded-lg">
        halo
      </div>
      <div className="mt-2 flex justify-between">
        <LuScroll className="w-5 h-5 text-[#C036A9]" />
        <span className="text-medium font-bold">{label}</span>
      </div>
      <Separator className="border-t-2 my-1" />
      <div className="flex">
        <div className="w-4 h-4 rounded-full flex items-center justify-center bg-[#E2B720] bg-opacity-10 ml-1">
          <LuCoins className="text-[#E2B720] p-0.5" />
        </div>
        <div className="flex flex-col ml-1">
          <span style={{ fontSize: '10px', marginBottom: '-3px' }}>{cost}</span>
          <span style={{ fontSize: '6px' }} className={`line-through ${isSelected ? 'text-[#95B0B4]' : 'text-[#E24F20]'}`}>{discCost}</span>
        </div>
      </div>
      {isSelected && (
        <div className="absolute inset-0 flex items-center justify-center flex-col">
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