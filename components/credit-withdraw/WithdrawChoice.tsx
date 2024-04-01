import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LuCoins } from "react-icons/lu";

const withdrawNominals = [
  { nominal: 10000, price: 13000, discount: 30000 },
  { nominal: 20000, price: 25000, discount: 50000 },
  { nominal: 50000, price: 60000, discount: 100000 },
  { nominal: 100000, price: 120000, discount: 200000 },
];

export function WithdrawChoice() {
  return (
    <div className="flex flex-row gap-2 overflow-x-scroll">
      {withdrawNominals.map((item, index) => (
        <div key={index} className="relative">
          <div className="absolute top-0 left-0 w-full h-full hover:bg-primary/20 z-10 rounded-md"></div>
          <Card className="flex flex-col p-3 gap-2">
            <div className="w-[86px] h-[86px]">
              <Image
                src={`/assets/${item.nominal}.svg`}
                alt={item.nominal.toString()}
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <span className="w-full text-sm font-bold text-right">
                Rp{item.nominal}
              </span>
              <Separator className="bg-[#E5EEF0]"></Separator>
              <div className="flex flex-row gap-0.5">
                <span className="flex w-3 h-3 justify-center bg-[#FCF8E9] items-center rounded-full">
                  <LuCoins className="flex w-1.5 h-1.5 text-[#E2B720]"></LuCoins>
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] leading-3">{item.price}</span>
                  <span className="line-through text-[8px] leading-3 text-[#E24F20]">
                    {item.discount}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
