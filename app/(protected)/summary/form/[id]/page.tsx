import { auth } from "@/auth";
import { SummaryWrapper } from "@/components/creator-side/summary/SummaryWrapper";
import TertiaryNavbar from "@/components/dashboard/TertiaryNavbar";
import {
  getCompletedQuestionnaireForRespondent,
  getSummaries,
} from "@/lib/action/form";
import { UserRoleEnum } from "@/lib/types/auth";
import { Session } from "next-auth";

interface Props {
  params: {
    id: string;
  };
}

export default async function Summary({ params }: Readonly<Props>) {
  const { id } = params;
  const session = (await auth()) as Session;

  const form = await getQuestionnaireSummmary();

  async function getQuestionnaireSummmary() {
    try {
      if (session.user.activeRole === UserRoleEnum.Respondent) {
        return await getCompletedQuestionnaireForRespondent(id);
      }

      if (session.user.activeRole === UserRoleEnum.Creator) {
        return await getSummaries(id);
      }
    } catch (error) {}

    return {};
  }

  return (
    <>
      <header className="flex flex-col items-center w-full">
        <TertiaryNavbar
          formTitle={
            session.user.activeRole === UserRoleEnum.Respondent
              ? form.title
              : form?.formStatistics?.title
          }
        />
      </header>
      <div className="flex h-full w-full absolute">
        {session.user.activeRole === UserRoleEnum.Respondent ? (
          <></>
        ) : (
          <SummaryWrapper
            formStatistics={form.formStatistics}
            questionsWithAnswers={form.questionsWithAnswers}
            allIndividuals={form.allIndividuals}
            formId={id}
            session={session}
          />
        )}
      </div>
    </>
  );
}
