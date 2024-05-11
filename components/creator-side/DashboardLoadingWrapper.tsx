import { LoadingProps } from "@/lib/types";
import { LoadingNav } from "../common/LoadingNav";

export function DashboardLoadingWrapper({ label }: Readonly<LoadingProps>) {
  return (
    <div className="flex flex-col w-full h-full absolute">
      <div className="flex flex-col md:flex-row w-full flex-1 h-full gap-4 p-5 relative ">
        <div className="flex flex-col md:hidden font-semibold text-[10px] items-center gap-2"></div>
        <LoadingNav label={label} />
        <div className="flex flex-col w-full flex-1 bg-red-500"></div>
      </div>
    </div>
  );
}
