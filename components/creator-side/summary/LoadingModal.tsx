import { useSummaryContext } from "@/lib/context/SummaryContext";

export function LoadingModal() {
  const { isFinishedFetching } = useSummaryContext();

  return (
    <>
      {isFinishedFetching && (
        <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-[100]">
          <div className="w-fit h-fit flex flex-col gap-4 bg-white rounded-xl p-8 justify-center items-center">
            <div className="animate-spin rounded-full h-10 w-10 md:h-20 md:w-20 border-t-2 border-b-2 border-[#1D2425]"></div>
            <div className="text-[#1D2425] text-[14px] font-semibold leading-normal">
              Exporting data into CSV file...
            </div>
          </div>
        </div>
      )}
    </>
  );
}
