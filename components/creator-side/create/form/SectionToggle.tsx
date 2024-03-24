import React, { ReactNode } from "react";
import { LuBoxSelect } from "react-icons/lu";

interface SectionToggleProps {
  numbering?: number;
  children?: ReactNode;
}

export function SectionToggle({
  numbering = 0,
  children,
}: Readonly<SectionToggleProps>) {
  return (
    <div className="flex flex-col w-full gap-1 py-1 px-2.5 rounded-md justify-start bg-transparent border border-transparent">
      <div className="flex w-full items-center gap-1.5">
        <div className="flex-shrink-0 w-6 h-6 bg-[#D8EAEE] rounded-md text-primary justify-center items-center text-[10px] leading-3 flex">
          {numbering}
        </div>
        <div className="flex flex-row rounded-full gap-1 font-medium text-[10px] leading-[12px] h-fit px-2 py-1 items-center bg-[#D8EAEE] text-primary">
          <LuBoxSelect className="font-semibold w-3 h-3"></LuBoxSelect>
          <span>Section</span>
        </div>
      </div>
      <div className="flex flex-col w-full p-2 gap-1 rounded-lg bg-[#F3F8F9]">
        {children}
      </div>
    </div>
  );
}
