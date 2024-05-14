import { Skeleton } from "../ui/skeleton";

export function ProfileLoading() {
  return (
    <>
      <Skeleton className="w-28 h-28 sm:w-36 sm:h-36 mx-auto relative -top-12 bg-white rounded-full -mb-10 sm:mx-0 sm:-mb-32" />

      <div className="mb-8 text-center sm:text-left sm:ml-40 sm:mb-12">
        <div className="font-bold text-base mb-1 sm:mb-2 sm:text-xl flex justify-center md:justify-start">
          <Skeleton className="w-32 h-4" />
        </div>
        <div className="text-xs text-gray-500 text-[14px] flex justify-center md:justify-start">
          <Skeleton className="w-32 h-4" />
        </div>
      </div>
    </>
  );
}
