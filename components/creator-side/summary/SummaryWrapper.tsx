"use client";

import { SummarizeFormAsProps } from "@/lib/types";
import SummaryNav from "./SummaryNav";
import { BackAndExport } from "@/components/dashboard/BackAndExport";

export function SummaryWrapper({
  formStatistics,
  questionsWithAnswers,
  allIndividuals,
}: Readonly<SummarizeFormAsProps>) {
  console.log(formStatistics);
  console.log(questionsWithAnswers);
  console.log(allIndividuals);

  return (
    <div className="flex flex-col md:flex-row w-full h-full gap-4 p-5 pt-3 relative">
      <SummaryNav state="summary"></SummaryNav>
      <div className="flex flex-col w-full space-y-4 flex-1">
        <div className="md:flex hidden flex-col justify-center items-start gap-[12px] self-stretch px-5 py-[10px] rounded-[6px] bg-[#E5EEF0]">
          <BackAndExport />
          <h3 className="text-[#32636A] text-[14px] font-semibold text-wrap w-full leading-normal">
            {formStatistics ? formStatistics.title : "Failed to load title"}
          </h3>
        </div>
      </div>
    </div>
  );
}
