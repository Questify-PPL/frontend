import { auth } from "@/auth";
import { CreatorHomePage } from "@/components/creator-side/CreatorHomePage";
import { UserRoleEnum } from "@/lib/types/auth";
import { Session } from "next-auth";

export default async function Home() {
  const session = (await auth()) as Session;

  return (
    <>
      {session.user.activeRole === UserRoleEnum.Creator && <CreatorHomePage />}
      {session.user.activeRole === UserRoleEnum.Respondent && (
        <div>{UserRoleEnum.Respondent}</div>
      )}
      {session.user.activeRole === UserRoleEnum.Admin && (
        <div>{UserRoleEnum.Admin}</div>
      )}
    </>
  );
}
