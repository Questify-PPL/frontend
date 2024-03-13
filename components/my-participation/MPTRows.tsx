import React from "react";
import { LuCoins, LuDices } from "react-icons/lu";

interface MPTRowsProps {
  title?: string;
  endDate?: string; // date
  prize?: number;
  winningChance?: string;
  questions?: string; // number
  status?: string; // boolean
  earned?: number;
}

export function MPTRows({
  title = "",
  endDate = "",
  prize = 0,
  winningChance = "",
  questions = "",
  status = "",
  earned = 0,
}: MPTRowsProps) {
  return (
    <div className="flex w-full p-3 mt-5 ">
      <div className="w-3/5 flex flex-row gap-3">
        <div className="min-w-8 h-8 bg-gray-400 rounded-md flex justify-center items-center text-white">
          EC
        </div>
        <div className="flex flex-col mb-1 ">
          <div className="text-xs text-teal-900">created on 22/04/2021</div>
          <div className="text-l text-wrap wfull font-bold ">
            Exploring Consumer Needs: A Survey on Indonesia Paper Product
            Preferences
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-2 mb-1 w-1/5">
        <div className="text-l text-wrap font-bold ">22/05/2021</div>
      </div>

      <div className="flex flex-col mb-1 mt-2 w-1/5">
        <div className="flex flex-row">
          <div className="flex flex-row text-xs font-bold text-[#685B2D]">
            <LuCoins className="mr-1 text-[#E2B720]"></LuCoins>
            250.000
          </div>
          <div className="ml-1 flex flex-row text-xs font-medium text-[#685B2D]">
            for
          </div>
        </div>
        <div className="flex flex-row">
          <div className="text-xs font-bold  text-[#685B2D] mr-1">4 </div>
          <div className="text-xs font-medium text-[#685B2D]">
            lucky respondents
          </div>
        </div>
      </div>

      <div className="flex flex-col mb-1 mt-2 w-1/5">
        <div className="flex flex-row">
          <div className="flex flex-row text-xs font-bold text-[#685B2D]">
            <LuDices className="mr-1 text-[#E2B720]"></LuDices>
            100%
          </div>
          <div className="ml-1 flex flex-row text-xs font-medium text-[#685B2D]">
            winning chance
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-2 mb-1 w-1/5">
        <div className="text-l text-wrap font-bold ">22/100</div>
      </div>

      <div className="flex flex-col mt-2 mb-1 w-1/5">
        <div className="text-l text-wrap font-bold ">On Going</div>
      </div>

      <div className="flex flex-row text-xs font-bold text-[#685B2D]">
        <LuCoins className="mr-1 text-[#E2B720]"></LuCoins>
        2.000
      </div>

      {/* <div className="flex flex-col mt-2 mb-1 w-1/5">
                <div className="">
                    <LuMoreHorizontal></LuMoreHorizontal>
                </div>
            </div> */}
    </div>
  );
}
