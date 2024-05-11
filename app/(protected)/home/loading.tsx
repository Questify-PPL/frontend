import { auth } from "@/auth";
import { DashboardLoadingWrapper } from "@/components/creator-side/DashboardLoadingWrapper";
import { Session } from "next-auth";

export default async function Loading() {
  const session = (await auth()) as Session;

  return (
    <DashboardLoadingWrapper label="home">
      {session.user.activeRole === "CREATOR" && <></>}
      {session.user.activeRole === "RESPONDENT" && <></>}
      {session.user.activeRole === "ADMIN" && <></>}
    </DashboardLoadingWrapper>
  );
}
