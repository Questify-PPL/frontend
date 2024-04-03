import { URL as fetchURL } from "@/lib/constant";
import { useSummaryContext } from "@/lib/context/SummaryContext";
import { convertToCSV } from "@/lib/utils";
import { LuChevronLeft, LuUpload } from "react-icons/lu";

export function BackAndExport() {
  const { setIsFinishedFetching, formId, session } = useSummaryContext();

  async function exportData() {
    setIsFinishedFetching(true);

    const response = await fetch(`${fetchURL.summaryURL}/${formId}/export`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });

    await convertToCSV(response);

    setIsFinishedFetching(false);
  }

  return (
    <div className="flex justify-between items-end self-stretch">
      <button className="flex gap-1 items-center" onClick={() => {}}>
        <LuChevronLeft className="text-[#95B0B4] h-4 w-4" />
        <p className="text-[#95B0B4] text-[14px] font-semibold leading-normal">
          Back
        </p>
      </button>
      <button
        className="flex gap-1 items-center"
        onClick={exportData}
        data-testid="export-button"
      >
        <LuUpload className="text-[#95B0B4] h-4 w-4" />
        <p className="text-[#95B0B4] text-[14px] font-semibold leading-normal">
          Export
        </p>
      </button>
    </div>
  );
}
