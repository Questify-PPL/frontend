"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LuScroll,
  LuCoins,
  LuInfo,
  LuDownload,
  LuPlusCircle,
  LuShoppingCart,
  LuTag,
} from "react-icons/lu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";

import { useRouter } from "next/navigation";

interface HomeNavProps {
  className?: string;
  formsRemainder?: number;
  creditsBalance?: number;
}

const HomeNav: React.FC<HomeNavProps> = ({
  className = "",
  formsRemainder = 0,
  creditsBalance = 0,
}) => {
  const router = useRouter();

  const toFormShop = () => {
    router.push("/home");
  };
  const toFormPromo = () => {
    router.push("/home");
  };
  const toCreditExchange = () => {
    router.push("/home");
  };
  const toCreditWithdraw = () => {
    router.push("/home");
  };

  const button =
    "flex flex-row bg-background w-full hover:bg-accent p-0 md:p-2 h-fit gap-2 justify-start";

  return (
    <Card className={`flex flex-col p-3 gap-3 ${className} overflow-x-auto`}>
      <div className="flex flex-row md:p-2">
        <div className="flex flex-row gap-1.5 w-full">
          <span className="flex w-7 h-7 justify-center bg-[#F9EBF6] items-center rounded-full">
            <LuScroll className="flex w-5 h-5 text-[#C036A9]"></LuScroll>
          </span>
          <div className="flex flex-col w-full">
            <span className="font-bold text-[16px] md:text-[20px]">
              {formsRemainder}
            </span>
            <div className="flex flex-row gap-1 w-full">
              <div className="font-semibold text-[14px] md:text-[17.5px] flex wrapper:flex-row flex-col gap-1">
                empty forms
              </div>
              <HoverCard>
                <HoverCardTrigger>
                  <LuInfo className="flex w-4 h-4 text-[#95B0B4]"></LuInfo>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    Information about forms
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-1.5 w-full">
          <span className="flex w-7 h-7 justify-center bg-[#FCF8E9] items-center rounded-full">
            <LuCoins className="flex w-5 h-5 text-[#E2B720]"></LuCoins>
          </span>
          <div className="flex flex-col">
            <span className="font-bold  text-[16px] md:text-[20px]">
              {creditsBalance}
            </span>
            <div className="flex flex-row gap-1">
              <span className="font-semibold text-[14px] md:text-[17.5px]">
                credits
              </span>
              <HoverCard>
                <HoverCardTrigger>
                  <LuInfo className="flex w-4 h-4 text-[#95B0B4] font-extrabold"></LuInfo>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    Information about credits
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-[#E5EEF0]"></Separator>

      <div className="flex flex-row w-full gap-2">
        <Button className={button} onClick={toFormShop}>
          <span className="flex min-w-6 min-h-6 justify-center bg-[#C036A9] items-center rounded-md">
            <LuShoppingCart className="flex w-3 h-3 text-background"></LuShoppingCart>
          </span>
          <span className="flex flex-[1_0_0] font-medium text-[10px] leading-[11px] text-left md:text-sm w-full text-wrap text-black">
            Form Shop
          </span>
        </Button>
        <Button className={button} onClick={toFormPromo}>
          <span className="flex min-w-6 min-h-6 justify-center bg-[#C036A9] items-center rounded-md">
            <LuTag className="flex w-3 h-3 text-background"></LuTag>
          </span>
          <span className="flex flex-[1_0_0] font-medium text-[10px] leading-[11px] text-left md:text-sm w-full text-wrap text-black">
            Form Promo
          </span>
        </Button>
        <Button className={button} onClick={toCreditExchange}>
          <span className="flex min-w-6 min-h-6 justify-center bg-[#E2B720] items-center rounded-md">
            <LuPlusCircle className="flex w-3 h-3 text-background"></LuPlusCircle>
          </span>
          <span className="flex flex-[1_0_0] font-medium text-[10px] leading-[11px] text-left md:text-sm w-full text-wrap text-black">
            Credit Exchange
          </span>
        </Button>
        <Button className={button} onClick={toCreditWithdraw}>
          <span className="flex min-w-6 min-h-6 justify-center bg-[#E2B720] items-center rounded-md">
            <LuDownload className="flex w-3 h-3 text-background"></LuDownload>
          </span>
          <span className="flex flex-[1_0_0] font-medium text-[10px] leading-3 text-left md:text-sm w-full text-wrap text-black">
            Credit Withdraw
          </span>
        </Button>
      </div>
    </Card>
  );
};

export default HomeNav;
