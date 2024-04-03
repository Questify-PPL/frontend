import { auth } from "@/auth";
import { AdminHomePage } from "@/components/admin-side/AdminHomePage";
import { CreatorHomePage } from "@/components/creator-side/CreatorHomePage";
import RespondentHomePage from "@/components/respondent-side/RespondentHomePage";
import {
  getQuestionnairesFilled,
  getQuestionnairesOwned,
} from "@/lib/action/form";
import { UserRoleEnum } from "@/lib/types/auth";
import { BareForm } from "@/lib/types/form.type";
import { Session } from "next-auth";
import { getInvoices } from "@/lib/action";

export default async function Home() {
  const session = (await auth()) as Session;

  const forms = await getForm();

  async function getForm() {
    let forms: BareForm[] = [];

    try {
      if (session.user.activeRole === UserRoleEnum.Creator) {
        forms = await getQuestionnairesOwned();
      }

      if (session.user.activeRole === UserRoleEnum.Respondent) {
        forms = await getQuestionnairesFilled();
      }
    } catch (error) {}

    return forms;
  }

  return (
    <>
      {session.user.activeRole === UserRoleEnum.Creator && (
        <CreatorHomePage forms={forms} />
      )}
      {session.user.activeRole === UserRoleEnum.Respondent && (
        <RespondentHomePage forms={forms} isRespondent={true} />
      )}
      {session.user.activeRole === UserRoleEnum.Admin && (
        <AdminHomePage invoices={await getInvoices()} />
      )}
    </>
  );
}
