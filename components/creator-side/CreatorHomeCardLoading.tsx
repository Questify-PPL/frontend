import React from "react";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";

export function CreatorHomeCardLoading() {
  return (
    <Card className={`flex flex-col p-3 gap-3 overflow-x-auto flex-shrink-0`}>
      <div className="flex flex-row md:p-2">
        <div className="flex flex-row gap-1.5 w-full">
          <Skeleton className="w-1/4 h-14"></Skeleton>
        </div>
        <div className="flex flex-row gap-1.5 w-full">
          <Skeleton className="w-1/4 h-14"></Skeleton>
        </div>
      </div>

      <Separator className="bg-[#E5EEF0]"></Separator>

      <div className="flex flex-row w-full gap-2">
        <Skeleton className="w-1/4 h-10"></Skeleton>
        <Skeleton className="w-1/4 h-10"></Skeleton>
        <Skeleton className="w-1/4 h-10"></Skeleton>
        <Skeleton className="w-1/4 h-10"></Skeleton>
      </div>
    </Card>
  );
}
