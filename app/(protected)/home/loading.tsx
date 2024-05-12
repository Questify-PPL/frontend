import { auth } from "@/auth";
import { DashboardLoadingWrapper } from "@/components/common";
import { CreatorHomeCardLoading } from "@/components/creator-side/CreatorHomeCardLoading";
import { Skeleton } from "@/components/ui/skeleton";
import { Session } from "next-auth";

export default async function Loading() {
  const session = (await auth()) as Session;

  return (
    <DashboardLoadingWrapper label="home" state="home">
      {session.user.activeRole === "CREATOR" && (
        <>
          <CreatorHomeCardLoading />
          <div className="flex flex-col gap-[10px] min-h-[16rem] mt-4 px-2 w-full">
            <div className="text-[#32636A] text-[10px] font-semibold">
              Here are your active questionnaire(s)
            </div>
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={`skeleton-${index + 1}`}
                className="w-full h-20"
              ></Skeleton>
            ))}
          </div>
        </>
      )}
      {session.user.activeRole === "RESPONDENT" && <></>}
      {session.user.activeRole === "ADMIN" && <></>}
    </DashboardLoadingWrapper>
  );
}
