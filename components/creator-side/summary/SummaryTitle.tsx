import { useSummaryContext } from "@/lib/context/SummaryContext";

export function SummaryTitle() {
  const { formStatistics } = useSummaryContext();

  return (
    <h3 className="text-[#32636A] text-[14px] font-semibold text-wrap w-full leading-normal">
      {formStatistics ? formStatistics.title : "Failed to load title"}
    </h3>
  );
}
