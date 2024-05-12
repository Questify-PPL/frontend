import { LoadingProps } from "@/lib/types";
import { LoadingNav } from "./LoadingNav";
import { Skeleton } from "../ui/skeleton";

export function DashboardLoadingWrapper({
  label,
  state,
  children,
  className,
}: Readonly<LoadingProps>) {
  return (
    <div className="flex flex-col w-full h-full absolute">
      {label == "home" && (
        <>
          <div className="absolute block md:hidden w-full h-[170px] bg-[#E5EEF0] flex-shrink-0"></div>
          <div className="flex flex-col gap-4 font-semibold text-[10px] items-center md:hidden">
            <div className="flex flex-row gap-1">
              <Skeleton className="w-28 h-8" />
            </div>
            <Skeleton className="w-52 h-16" />
          </div>
        </>
      )}

      <div className="flex flex-col md:flex-row w-full flex-1 h-full gap-4 p-5 relative ">
        <LoadingNav state={state} label={label} />
        <div
          className={`flex flex-col w-full flex-1 ${className ? className : ""}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
