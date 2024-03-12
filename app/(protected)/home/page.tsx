import { auth } from "@/auth";
import { UserRoleEnum } from "@/lib/types/auth";
import { Session } from "next-auth";
import CreatorNav from "@/components/creator-side/CreatorNav";
import HomeCard from "@/components/creator-side/HomeCard";

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

function CreatorHomePage() {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col md:flex-row w-full h-full gap-4 p-5">
        <CreatorNav
          className="absolute md:relative md:flex md:w-[20%]"
          state="home"
        ></CreatorNav>
        <div className="flex flex-col w-full">
          <HomeCard className="w-full"></HomeCard>
        </div>
      </div>
    </div>
  );
}
