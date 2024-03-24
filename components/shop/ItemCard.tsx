'use client'

import React from "react";
import { Card } from "@/components/ui/card";
import { LuScroll, LuCoins } from "react-icons/lu";
import { Separator } from "@radix-ui/react-dropdown-menu";

interface CardProps {
    label: string;
    cost: string;
    discCost: string;
    imageUrl: string;
  }

  const ItemCard: React.FC<CardProps> = ({ label, cost, discCost, imageUrl }) => {

  return (
    <Card className="min-w-28 h-40 p-3 gap-2  ">
     

        <div className="min-w-21 h-20 bg-red-500 rounded-lg">halo</div>
        <div className="mt-2 flex justify-between"> 
        <LuScroll className="w-5 h-5 text-[#C036A9]"></LuScroll>
        <span className="text-medium font-bold" >{label}</span>
        </div>
        <Separator className="border-t-2 my-1 text-[#E5EEF0]"></Separator>
        <div className="flex"> 
        <LuCoins className="text-[#E2B720]"></LuCoins>
        <div className="flex flex-col ml-1">

        <span style={{ fontSize: '10px', marginBottom: '-3px'  }}>{cost}</span>
        <span style={{ fontSize: '6px' }} className="text-[#E24F20] line-through">{discCost}</span>

        </div>
        </div>
      
    </Card>
  );
};

export default ItemCard;
