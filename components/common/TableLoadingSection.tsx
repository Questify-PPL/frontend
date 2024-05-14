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
      {isCreator && !isResponses && (
        <Skeleton className="md:w-1/4 w-full h-14" />
      )}

      {!isResponses && label && (
        <p className="text-[#32636A] text-[10px] font-medium">{label}</p>
      )}

      {isResponses && (
        <>
          <Skeleton className="w-full h-14" />
          <Separator className="bg-[#E5EEF0]"></Separator>
        </>
      )}

      {isResponses && isCreator && (
        <div className="flex md:justify-start gap-[6px]">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={`skeleton-1-${index + 1}`}
              className="w-[8%] h-8 rounded-[30%]"
            ></Skeleton>
          ))}
        </div>
      )}

      {isResponses && !isCreator && <Skeleton className="w-1/4 h-8" />}

      <TableHeaderLoading />
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton
          key={`skeleton-2-${index + 1}`}
          className="w-full h-20"
        ></Skeleton>
      ))}

      {isResponses && !isCreator && (
        <>
          <Skeleton className="w-1/4 h-8" />
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={`skeleton-2-${index + 1}`}
              className="w-full h-20"
            ></Skeleton>
          ))}
        </>
      )}
    </>
  );
}
