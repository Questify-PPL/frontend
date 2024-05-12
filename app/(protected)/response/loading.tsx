import { auth } from "@/auth";
import {
  DashboardLoadingWrapper,
  TableLoadingSection,
} from "@/components/common";
import { Session } from "next-auth";

export default async function Loading() {
  const session = (await auth()) as Session;

  return (
    <DashboardLoadingWrapper
      label="Responses"
      state="responses"
      className="gap-4"
    >
      {session.user.activeRole === "CREATOR" && (
        <TableLoadingSection isCreator={true} isResponses={true} />
      )}
      {session.user.activeRole === "RESPONDENT" && (
        <TableLoadingSection isCreator={false} isResponses={true} />
      )}
    </DashboardLoadingWrapper>
  );
}
