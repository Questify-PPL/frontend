import { auth } from "@/auth";
import { SummaryLoadingWrapper } from "@/components/common/SummaryLoadingWrapper";
import { UserRoleEnum } from "@/lib/types/auth";
import { Session } from "next-auth";

export default async function Loading() {
  const session = (await auth()) as Session;

  return (
    <>
      {session.user.activeRole === UserRoleEnum.Respondent ? (
        <></>
      ) : (
        <SummaryLoadingWrapper></SummaryLoadingWrapper>
      )}
    </>
  );
}
