"use client";

import React, { ChangeEvent, useState } from "react";
import TopUpInfoTable from "./TopUpInfoTable";
import { TopUpProvider } from "@/lib/provider/TopUpProvider";
import { TopUpProps } from "@/lib/types/topup.type";

import PaymentPopup from "./PaymentPopup";
import { useRouter } from "next/navigation";
import { LuCoins, LuInfo } from "react-icons/lu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

export default function TopUpWrapper(props: Readonly<TopUpProps>) {
  const [topUpAmount, setTopUpAmount] = useState<number>();

  const router = useRouter();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 0);
    setTopUpAmount(value);
  };

  const [isPopupOpen, setPopupOpen] = useState(false);

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
    router.refresh();
  };

  return (
    <TopUpProvider {...props}>
      <div className="flex flex-col items-center justify-center px-4 py-2 bg-[#E5EEF0]">
        <span className="text-sm font-medium">You have</span>
        <div className="flex items-center justify-center space-x-2">
          <LuCoins className="text-yellow-500" size="1.5em" />{" "}
          <span className="text-lg font-bold">
            {props.session?.user.credit}{" "}
            <span className="font-semibold">credits</span>
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

      <div
        className={`p-2 mt-10 w-full" md:w-full md:mx-auto flex flex-col items-center justify-center`}
      >
        <div className="flex flex-col mb-2 items-center">
          <span className="text-[#1D2425] font-semibold text-base">
            Credit Top Up
          </span>
          <span className="text-[#95B0B4] font-sm text-xs">
            Enter top up amount
          </span>
          <br />
          <input
            type="number"
            value={topUpAmount}
            onChange={handleInputChange}
            min="10000"
            placeholder="Minimum topup is 10000"
            className="px-3 py-2 border border-gray-300 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={togglePopup}
            className={`mt-4 md:w-auto w-full bg-[#32636A] text-white font-medium py-2 px-6 rounded-md hover:bg-[#32839A] focus:outline-none focus:bg-blue-700 transition-colors`}
          >
            Confirm
          </button>
        </div>

        <div className="flex flex-col mt-10 items-center">
          <span className="text-[#1D2425] font-semibold text-base">
            Top Up History
          </span>
          <span className="text-[#95B0B4] font-sm text-xs">
            Top up you have made
          </span>
        </div>

        <div
          className={`justify-center md:flex-row flex-col items-center flex md:h-full md:mt-auto h-auto mt-5 w-full`}
        >
          <TopUpInfoTable invoiceItems={props.invoiceItems} />
        </div>

        {isPopupOpen && (
          <PaymentPopup onClose={togglePopup} amount={topUpAmount} />
        )}
      </div>
    </TopUpProvider>
  );
}
