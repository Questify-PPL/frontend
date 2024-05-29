import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-2 mt-10 flex flex-col items-center justify-center">
      <div className="flex flex-col mb-2 items-center">
        <span className="text-[#1D2425] font-semibold text-base">
          Basic Plans
        </span>
        <span className="text-[#95B0B4] font-sm text-xs">
          The form has no expiry date
        </span>
      </div>

      <div className="flex flex-row h-full w-full md:flex-row items-center justify-center md:gap-8 gap-6 flex-wrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={`loading-${i + 1}`} className="w-[10%] h-72" />
        ))}
      </div>

      <div className="flex flex-col mt-10 items-center">
        <span className="text-[#1D2425] font-semibold text-base">
          Purchase History
        </span>
        <span className="text-[#95B0B4] font-sm text-xs">
          Forms you have bought
        </span>
      </div>

      <div className="justify-center md:flex-row items-center flex h-full w-full">
        <table className="w-80 h-6 mt-2 md:w-1/2 rounded-lg border border-[#E5EEF0]">
          <thead>
            <tr className="flex flex-row rounded-lg border bg-card text-card-foreground shadow-sm p-3">
              <th className="flex w-1/2">
                <span className="font-bold text-[#32636A] text-m">Item</span>
              </th>
              <th className="flex w-1/2">
                <span className="font-bold text-[#32636A] text-m">Date</span>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}
