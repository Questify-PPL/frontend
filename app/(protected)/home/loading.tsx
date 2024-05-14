import { auth } from "@/auth";
import {
  DashboardLoadingWrapper,
  HomeQuestionnaireLoading,
} from "@/components/common";
import { CreatorHomeCardLoading } from "@/components/creator-side/CreatorHomeCardLoading";
import { RespondentHomeCardLoading } from "@/components/respondent-side/RespondentHomeCardLoading";
import { Session } from "next-auth";

export default async function Loading() {
  const session = (await auth()) as Session;

  return (
    <DashboardLoadingWrapper label="home" state="home">
      {session.user.activeRole === "CREATOR" && (
        <>
          <CreatorHomeCardLoading />
          <HomeQuestionnaireLoading label="Here are your active questionnaire(s)" />
        </>
      )}
      {session.user.activeRole === "RESPONDENT" && (
        <>
          <RespondentHomeCardLoading />
          <HomeQuestionnaireLoading label="Here are your on-going answered questionnaire(s)" />
        </>
      )}
      {session.user.activeRole === "ADMIN" && <></>}
    </DashboardLoadingWrapper>
  );
}
