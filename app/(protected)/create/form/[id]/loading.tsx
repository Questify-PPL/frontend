import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-row w-full h-screen gap-4 p-5">
      <Skeleton className="w-[20%] h-full" />
      <Skeleton className="w-[60%] h-full" />
      <Skeleton className="w-[20%] h-full" />
    </div>
  );
}
