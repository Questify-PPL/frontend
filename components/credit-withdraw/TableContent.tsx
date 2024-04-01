"use client";

import { WithdrawInfo } from "@/lib/types";
import { LuCheckCircle2 } from "react-icons/lu";

export function TableContent({ info }: Readonly<WithdrawInfo>) {
  return (
    <tr
      className="flex w-full p-3 gap-[10px] hover:cursor-pointer border-b border-[#E5EEF0] items-center hover:bg-[#F3F8F9]"
      data-testid="table-withdraw"
    >
      {/* Questions */}
      <td className="text-xs flex w-[25%] font-bold">{info.amount}</td>

      {/* Date */}
      <td className="text-[8px] leading-3 flex flex-col w-[20%] font-medium">
        {new Date(info.issuedAt).toLocaleDateString("en-GB")}
      </td>

      {/* Account */}
      <td className="text-[10px] leading-3 flex flex-col w-[25%] font-medium">
        <div className="flex flex-col gap-0">
          <span className="text-[10px] leading-3">{info.accountName}</span>
          <span className="text-[8px] leading-3">{info.accountNumber}</span>
        </div>
      </td>

      {/* Status */}
      <td className="text-xs flex w-[30%] font-bold">
        {info.status === "PENDING" ? (
          <div className="flex flex-row text-[#E2B720] bg-[#FDF8EA] rounded-full p-2 gap-0.5 w-full">
            <LuCheckCircle2 className="w-3 h-3"></LuCheckCircle2>
            <span className="text-[10px] leading-3">Pending</span>
          </div>
        ) : "REJECTED" ? (
          <div className="flex flex-row text-[#E24F20] bg-[#FDEDEA] rounded-full p-2 gap-0.5 w-full">
            <LuCheckCircle2 className="w-3 h-3"></LuCheckCircle2>
            <span className="text-[10px] leading-3">Rejected</span>
          </div>
        ) : "APPROVED" ? (
          <div className="flex flex-row text-[#39A014] bg-[#DDFAD6] rounded-full p-2 gap-0.5 w-full">
            <LuCheckCircle2 className="w-3 h-3"></LuCheckCircle2>
            <span className="text-[10px] leading-3">Approved</span>
          </div>
        ) : (
          "N/A"
        )}
      </td>
    </tr>
  );
}
