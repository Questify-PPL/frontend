"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { LuHelpCircle, LuActivity } from "react-icons/lu";

export function MPTHeader() {
  return (
    <Card className={`flex flex-col p-3`}>
      <div className="flex flex-row w-full ">
        <span className="w-3/5 text-[#32636A] flex font-medium text-[10px] leading-3 text-left md:text-sm text-wrap  ">
          Title
        </span>
        <span className="w-1/5 text-[#32636A] flex font-medium text-[10px] leading-3 text-left md:text-sm text-wrap ">
          End Date
        </span>
        <span className="w-1/5 text-[#95B0B4] flex font-medium text-[10px] leading-3 text-left md:text-sm text-wrap ">
          Prize
        </span>
        <span className="w-1/5 text-[#95B0B4] flex font-medium text-[10px] leading-3 text-left md:text-sm text-wrap ">
          Winning Chance
        </span>
        <span className="w-1/5 text-[#95B0B4] flex font-medium text-[10px] leading-3 text-left md:text-sm text-wrap ">
          <LuHelpCircle className="w-4 h-4 mr-1 text-[#32636A]"></LuHelpCircle>
          Questions
        </span>
        <span className="w-1/5 text-[#95B0B4] flex font-medium text-[10px] leading-3 text-left md:text-sm text-wrap ">
          <LuActivity className="w-4 h-4 mr-1 text-[#32636A]"></LuActivity>
          Status
        </span>
        <span className="w-1/5 text-[#32636A] flex font-medium text-[10px] leading-3 text-left md:text-sm text-wrap ">
          Earned
        </span>
      </div>
    </Card>
  );
}
