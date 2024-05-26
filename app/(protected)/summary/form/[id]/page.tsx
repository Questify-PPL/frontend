import { auth } from "@/auth";
import { SummaryWrapper } from "@/components/creator-side/summary/SummaryWrapper";
import TertiaryNavbar from "@/components/dashboard/TertiaryNavbar";
import { SummaryResponseWrapper } from "@/components/respondent-side/summary/SummaryResponseWrapper";
import {
  getCompletedQuestionnaireForRespondent,
  getInitialActiveTab,
  getSummaries,
} from "@/lib/action/form";
import { UserRoleEnum } from "@/lib/types/auth";
import { Metadata } from "next";
import { Session } from "next-auth";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  const session = (await auth()) as Session;

  return await getQuestionnaireSummmary(session, id, true);
}

export default async function Summary({ params }: Readonly<Props>) {
  const { id } = params;
  const session = (await auth()) as Session;

  const form = await getQuestionnaireSummmary(session, id);
  const initialActiveTab = await getInitialActiveTab();

  return (
    <>
      <header className="flex flex-col items-center w-full">
        <TertiaryNavbar
          formTitle={
            session.user.activeRole === UserRoleEnum.Respondent
              ? form.title
              : form?.formStatistics?.title
          }
          session={session}
          formId={id}
        />
      </header>
      <div className="flex h-full w-full absolute">
        {session.user.activeRole === UserRoleEnum.Respondent ? (
          <SummaryResponseWrapper questions={form.questions} />
        ) : (
          <SummaryWrapper
            formStatistics={form.formStatistics}
            questionsWithAnswers={form.questionsWithAnswers}
            allIndividuals={form.allIndividuals}
            formId={id}
            session={session}
            initialActiveTab={initialActiveTab}
          />
        )}
      </div>
    </>
  );
}

async function getQuestionnaireSummmary(
  session: Session,
  id: string,
  isMetadata = false,
) {
  let form;

  try {
    if (session.user.activeRole === UserRoleEnum.Respondent) {
      form = await getCompletedQuestionnaireForRespondent(id);
    }

    if (session.user.activeRole === UserRoleEnum.Creator) {
      form = await getSummaries(id);
    }

    if (!isMetadata) {
      return form;
    }

    let title;

    if (session.user.activeRole === UserRoleEnum.Respondent) {
      title = form.title ?? "";
    } else {
      title = form?.formStatistics?.title ?? "";
    }

    return {
      title: title,
      description: "Questify - Summary Page",
    };
  } catch (error) {
    if (isMetadata) {
      return {
        title: "Failed to Load",
        description: "Questify - Summary Page",
      };
    }

    return {};
  }
}
