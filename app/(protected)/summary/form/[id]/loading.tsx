import { auth } from "@/auth";
import { SummaryLoadingWrapper } from "@/components/common/SummaryLoadingWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { UserRoleEnum } from "@/lib/types/auth";
import { Session } from "next-auth";

export default async function Loading() {
  const session = (await auth()) as Session;

  return (
    <div className="flex flex-col gap-4 h-screen">
      <Skeleton className="w-full bg-[#E5EEF0] md:hidden">
        <div className="flex w-full px-5 py-[10px] gap-3 flex-col justify-center md:hidden">
          <Skeleton className="w-full flex flex-row justify-between items-end self-stretch bg-transparent">
            <Skeleton className="w-[8%] h-7 flex items-center gap-2 bg-[#bcc1c2] font-medium text-[12px] px-3 py-1 rounded-md text-white"></Skeleton>
            <Skeleton className="w-[8%] h-7 flex items-center gap-2 bg-[#bcc1c2] font-medium text-[12px] px-3 py-1 rounded-md text-white"></Skeleton>
          </Skeleton>
        </div>
        <div className="flex w-full px-5 py-[10px] justify-center">
          <Skeleton className="w-1/4 h-7"></Skeleton>
        </div>
      </Skeleton>

      {session.user.activeRole === UserRoleEnum.Respondent ? (
        <Skeleton className="h-full w-full"></Skeleton>
      ) : (
        <SummaryLoadingWrapper className="gap-4">
          <Skeleton className="w-full h-20 hidden md:block"></Skeleton>
          <Skeleton className="w-full h-full flex p-5 justify-end flex[1_0_0] gap-3 self-stretch border border-solid border-[#E5EEF0] rounded-sm">
            <Skeleton className="w-[8%] h-7 flex items-center gap-2 bg-[#bcc1c2] font-medium text-[12px] px-3 py-1 rounded-md text-white"></Skeleton>
            <Skeleton className="w-[8%] h-7 flex items-center gap-2 bg-[#bcc1c2] font-medium text-[12px] px-3 py-1 rounded-md text-white"></Skeleton>
            <Skeleton className="w-[8%] h-7 flex items-center gap-2 bg-[#bcc1c2] font-medium text-[12px] px-3 py-1 rounded-md text-white"></Skeleton>
          </Skeleton>
        </SummaryLoadingWrapper>
      )}
    </div>
  );
}
