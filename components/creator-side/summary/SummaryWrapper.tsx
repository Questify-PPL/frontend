"use client";

import { SummarizeFormAsProps } from "@/lib/types";
import SummaryNav from "./SummaryNav";
import { BackAndExport } from "@/components/dashboard/BackAndExport";
import { SummaryProvider } from "@/lib/provider/SummaryProvider";
import { SummaryTitle } from "./SummaryTitle";
import { ContentBox } from "./ContentBox";

export function SummaryWrapper(props: Readonly<SummarizeFormAsProps>) {
  return (
    <div className="flex flex-col md:flex-row w-full h-full gap-4 p-5 pt-3 relative">
      <SummaryProvider {...props}>
        <SummaryNav></SummaryNav>
        <div className="flex flex-col w-full space-y-4 flex-1">
          <div className="md:flex hidden flex-col justify-center items-start gap-[12px] self-stretch px-5 py-[10px] rounded-[6px] bg-[#E5EEF0]">
            <BackAndExport />
            <SummaryTitle />
          </div>
          <ContentBox />
        </div>
      </SummaryProvider>
    </div>
  );
}
