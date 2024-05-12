import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { TableHeaderLoading } from "./TableHeaderLoading";

export function TableLoadingSection({
  isCreator,
  isResponses,
  label,
}: Readonly<{
  isCreator: boolean;
  isResponses: boolean;
  label?: string;
}>) {
  return (
    <>
      {isCreator && <Skeleton className="md:w-1/4 w-full h-14" />}

      {!isResponses && label && (
        <p className="text-[#32636A] text-[10px] font-medium">{label}</p>
      )}

      {isResponses && (
        <>
          <Skeleton className="w-full h-14" />
          <Separator className="bg-[#E5EEF0]"></Separator>
          <div className="flex justify-center md:justify-start gap-[6px] mb-8 pb-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={`skeleton-1-${index + 1}`}
                className="w-8 h-8 rounded-[30%]"
              ></Skeleton>
            ))}
          </div>
        </>
      )}
      <TableHeaderLoading />
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton
          key={`skeleton-2-${index + 1}`}
          className="w-full h-20"
        ></Skeleton>
      ))}
    </>
  );
}
