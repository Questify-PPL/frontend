import { LoadingProps } from "@/lib/types";
import { SummaryLoadingNav } from "./SummaryLoadingNav";

export function SummaryLoadingWrapper({
  children,
  className,
}: Readonly<Partial<LoadingProps>>) {
  return (
    <div className="flex flex-col w-full h-full absolute">
      <div className="flex flex-col md:flex-row w-full flex-1 h-full gap-4 p-5 relative ">
        <SummaryLoadingNav />
        <div className={`flex flex-col w-full flex-1 ${className ?? ""}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
