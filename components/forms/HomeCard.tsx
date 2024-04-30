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
  isRespondent?: boolean;
}

const HomeNav: React.FC<HomeNavProps> = ({
  className = "",
  formsRemainder = 0,
  creditsBalance = 0,
  isRespondent = false,
}) => {
  const router = useRouter();

  const toFormShop = () => {
    router.push("/shop");
  };
  const toFormPromo = () => {
    router.push("/home");
  };
  const toCreditExchange = () => {
    router.push("/home");
  };
  const toCreditWithdraw = () => {
    router.push("/withdraw");
  };

  const button =
    "flex flex-row bg-background w-full hover:bg-accent p-0 md:p-2 h-fit gap-2 justify-start";

  return (
    <>
      {!isRespondent && (
        <Card
          className={`flex flex-col p-3 gap-3 ${className} overflow-x-auto flex-shrink-0`}
        >
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
      )}
      {isRespondent && (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm  p-3 flex flex-row justify-between items-center w-full md:w-1/2">
          <div className="flex-1 flex flex-row gap-[4px] justify-center items-center">
            <LuCoins className="w-4 h-4 flex-shrink-0 text-[#E2B720]" />
            <div className="flex-1 flex flex-col gap-0 justify-start items-start">
              <div className="text-[#1D245] font-bold text-[16px] leading-normal">
                {creditsBalance}
              </div>
              <div className="text-[#1D245] font-semibold text-[14px] leading-normal">
                credits
              </div>
            </div>
          </div>
          <div className="w-fit flex flex-col items-center justify-center gap-[6px]">
            <svg
              width="23"
              height="22"
              viewBox="0 0 23 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.5 -0.00146484C2.29086 -0.00146484 0.5 1.7894 0.5 3.99854V17.9985C0.5 20.2077 2.29086 21.9985 4.5 21.9985H18.5C20.7091 21.9985 22.5 20.2077 22.5 17.9985V3.99854C22.5 1.7894 20.7091 -0.00146484 18.5 -0.00146484H4.5ZM7.60037 12.4985C7.60037 12.1671 7.33175 11.8985 7.00037 11.8985C6.669 11.8985 6.40037 12.1671 6.40037 12.4985V14.4985C6.40037 14.9229 6.56895 15.3298 6.869 15.6299C7.16906 15.9299 7.57603 16.0985 8.00037 16.0985H15.0004C15.4247 16.0985 15.8317 15.9299 16.1317 15.6299C16.4318 15.3298 16.6004 14.9229 16.6004 14.4985V12.4985C16.6004 12.1671 16.3317 11.8985 16.0004 11.8985C15.669 11.8985 15.4004 12.1671 15.4004 12.4985V14.4985C15.4004 14.6046 15.3582 14.7063 15.2832 14.7814C15.2082 14.8564 15.1065 14.8985 15.0004 14.8985H8.00037C7.89429 14.8985 7.79255 14.8564 7.71753 14.7814C7.64252 14.7063 7.60037 14.6046 7.60037 14.4985V12.4985ZM8.57608 9.57429C8.81039 9.33997 9.19029 9.33997 9.42461 9.57429L10.8999 11.0496V6.49851C10.8999 6.16714 11.1685 5.89851 11.4999 5.89851C11.8313 5.89851 12.0999 6.16714 12.0999 6.49851V11.0505L13.5761 9.57429C13.8104 9.33997 14.1903 9.33997 14.4246 9.57429C14.6589 9.8086 14.6589 10.1885 14.4246 10.4228L11.9246 12.9228C11.7979 13.0495 11.6287 13.1077 11.4629 13.0974C11.3054 13.0878 11.1643 13.0175 11.0628 12.9095L8.57608 10.4228C8.34176 10.1885 8.34176 9.8086 8.57608 9.57429Z"
                fill="#E2B720"
              />
            </svg>
            <span className="text-[10px] text-[#1D2425] font-medium leading-[11px]">
              Withdraw
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeNav;
