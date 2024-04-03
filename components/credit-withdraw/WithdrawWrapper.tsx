"use client";

import React, { useState, useEffect } from "react";
import {
  WithdrawChoice,
  WithdrawHeader,
  InfoTable,
  TableContent,
} from "@/components/credit-withdraw";
import { getWithdrawals } from "@/lib/action/withdraw";
import { WithdrawData } from "@/lib/types/withdraw.type";

export function WithdrawWrapper() {
  const [withdrawals, setWithdrawals] = useState<WithdrawData[]>([]);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      const data = await getWithdrawals();
      setWithdrawals(data.data);
    };
    fetchWithdrawals();
  }, [withdrawals]);

  return (
    <div className="flex flex-col gap-4">
      <WithdrawHeader />
      <div className="flex flex-col gap-3 px-4">
        <div className="flex flex-col gap-0">
          <span className="text-base font-semibold">
            Choices of Withdraw Nominals
          </span>
          <span className="text-slate-400 text-[10px] leading-3 font-medium">
            As you accumulate more credits, your earnings increase.
          </span>
        </div>
        <WithdrawChoice />
      </div>
      <div className="flex flex-col gap-3 px-4">
        <div className="flex flex-col gap-0">
          <span className="text-base font-semibold">Withdrawal History</span>
          <span className="text-slate-400 text-[10px] leading-3 font-medium">
            Money you withdrew
          </span>
        </div>
        <InfoTable>
          {withdrawals.map((info, index) => (
            <TableContent key={index} info={info} />
          ))}
        </InfoTable>
      </div>
    </div>
  );
}
