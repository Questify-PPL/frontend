import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex w-full min-h-screen justify-center items-center">
      <Skeleton className="w-[30%] h-80 " />
    </div>
  );
}
