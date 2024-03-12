"use client";

import { Card } from "@/components/ui/card";
import React from "react";
import {
  LuClipboardCheck,
  LuHelpCircle,
  LuPercent,
  LuTimer,
} from "react-icons/lu";

interface InfoTableProps {
  className?: string;
}

const tableColumns = [
  {
    name: "Title",
    icon: <></>,
  },
  {
    name: "Prize",
    icon: <></>,
  },
  {
    name: "Questions",
    icon: <LuHelpCircle className="w-4 h-4 mr-1 text-[#32636A]"></LuHelpCircle>,
  },
  {
    name: "Completed",
    icon: (
      <LuClipboardCheck className="w-4 h-4 mr-1 text-[#32636A]"></LuClipboardCheck>
    ),
  },
  {
    name: "Compl Rate",
    icon: <LuPercent className="w-4 h-4 mr-1 text-[#32636A]"></LuPercent>,
  },
  {
    name: "Updated",
    icon: <LuTimer className="w-4 h-4 mr-1 text-[#32636A]"></LuTimer>,
  },
];

export function InfoTable({ className = "" }: Readonly<InfoTableProps>) {
  return (
    <Card className={`flex flex-col p-3  ${className}`}>
      <div className="flex flex-row w-full ">
        {tableColumns.map((column, index) => (
          <span
            key={`column-${index + 1}`}
            className={` ${
              index === 0 ? "pl-4 w-3/5 justify-start" : "w-1/5 justify-center"
            } text-[#32636A] flex font-bold text-[10px] leading-3 text-left md:text-sm text-wrap items-center`}
          >
            {column.icon}
            {column.name}
          </span>
        ))}
      </div>
    </Card>
  );
}
