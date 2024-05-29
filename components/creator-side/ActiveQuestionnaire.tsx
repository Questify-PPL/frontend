"use client";

import { FormAsProps } from "@/lib/types";
import { decidePhoto } from "@/lib/utils";
import { useState } from "react";
import {
  LuChevronDown,
  LuClipboardCheck,
  LuClipboardEdit,
  LuCoins,
} from "react-icons/lu";

export function ActiveQuestionnaire({ form }: Readonly<FormAsProps>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-[10px] p-[10px]">
      <div className="flex flex-row gap-2">
        <div className="flex flex-col items-start justify-start">
          <div className="min-w-8 h-8 bg-[#95B0B4] rounded-md flex justify-center items-center text-white">
            {decidePhoto(form)}
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="text-[#32636A] text-[8px] font-medium self-stretch">
            Created on {new Date(form.createdAt).toDateString()}
          </div>
          <div className="text-[12px] font-bold text-foreground">
            {form.title}
          </div>
          <div className="flex flex-row px-[6px] py-[2px] rounded-[8px] gap-[2px] bg-[#FDF8EA] w-fit justify-center items-center">
            <LuCoins className="stroke-[#E2B720] stroke-[1.044px] w-[10px] h-[10px] flex-shrink-0" />
            <p className="text-[#685B2D] text-[8px] tracking-[-0.04px] font-medium">
              {form.prize} for{" "}
              {form.prizeType === "EVEN"
                ? "all participants"
                : `${form.maxWinner} lucky respondents`}
            </p>
          </div>
        </div>
        <div
          className="flex flex-col justify-center items-center w-[22px] h-[22px] bg-[#E5EEF0] flex-shrink-0 rounded-[4px] cursor-pointer"
          role="none"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? (
            <LuChevronDown
              className={`w-[12px] h-[12px] fill-[#E5EEF0] transform rotate-180 flex-shrink-0 ${isOpen ? "transform-rotate-180" : "transform-none"}`}
            />
          ) : (
            <LuChevronDown className="w-[12px] h-[12px] fill-[#E5EEF0] flex-shrink-0" />
          )}
        </div>
      </div>
      <div
        className={`flex-row gap-2 justify-around mt-1 items-center ${isOpen ? "flex" : "hidden"}`}
      >
        <div className="flex flex-col gap-0">
          <div className="flex flex-row gap-1 justify-start items-center">
            <LuClipboardEdit className="w-4 h-4 text-[#32636A]" />
            <p className="text-[14px] font-bold leading-normal text-[#1D2425]">
              {form.ongoingParticipation}
            </p>
          </div>
          <p className="self-stretch text-[#95B0B4] leading-normal text-[10px] text-start font-medium">
            Ongoing
          </p>
        </div>
        <div className="flex flex-col gap-0">
          <div className="flex flex-row gap-1 justify-start items-center">
            <LuClipboardCheck className="w-4 h-4 text-[#32636A]" />
            <p className="text-[14px] font-bold leading-normal text-[#1D2425]">
              {form.completedParticipation}
            </p>
          </div>
          <p className="self-stretch text-[#95B0B4] leading-normal text-[10px] text-start font-medium">
            Completed
          </p>
        </div>
      </div>
    </div>
  );
}
