import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function RespondentHomeCardLoading() {
  return (
    <Card
      className={`flex flex-col p-3 gap-3 overflow-x-auto flex-shrink-0 md:w-1/2`}
    >
      <div className="flex flex-row md:p-2">
        <div className="flex flex-row gap-1.5 w-full">
          <div className="w-full flex flex-row gap-2 items-center">
            <Skeleton className="flex-1 h-14"></Skeleton>
            <Skeleton className="w-12 h-14"></Skeleton>
          </div>
        </div>
      </div>
    </Card>
  );
}
