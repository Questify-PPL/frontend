"use client";

import React from "react";
import { LuHelpCircle, LuActivity } from "react-icons/lu";

interface MPTable {
  children: React.ReactNode;
}

const tableColumns = [
  {
    name: "Title",
    icon: <></>,
  },
  {
    name: "End Date",
    icon: <></>,
  },
  {
    name: "Prize",
    icon: <></>,
  },
  {
    name: "Winning Chance",
    icon: <></>,
  },
  {
    name: "Questions",
    icon: <LuHelpCircle className="w-4 h-4 mr-1 text-[#32636A]"></LuHelpCircle>,
  },
  {
    name: "Status",
    icon: (
      <LuActivity className="w-4 h-4 mr-1 text-[#32636A]"></LuActivity>
    ),
  },
  {
    name: "Earned",
    icon: <></>,
  },
  {
    name: "",
    icon: <></>,
  },
];

export function MPTable({
  children,
}: Readonly<MPTable>) {
  const columnWidth: string[] = ["21.75%", "11.25%", "13.75%", "13.75%", "14%", "11.25%", "11.25%", "3.125%"]

  return (
    <table className="flex flex-col" data-testid="mp-table">
      <thead>
        <tr className="flex flex-row flex-shrink-0 w-full rounded-lg border bg-card text-card-foreground shadow-sm p-3">
          <>
            {tableColumns.map((column, index) => (
              <th
                key={`column-${index + 1}`}
                className={` ${index === 0 ? "pl-11" : ""
                  } text-[#32636A] flex-shrink-0 justify-start align-stretch flex font-bold text-[10px] leading-3 text-left md:text-sm text-wrap items-center w-[${columnWidth[index]}]`}
              >
                {column.icon}
                {column.name}
              </th>
            ))}
          </>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
