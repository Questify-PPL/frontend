import { MPWrapper } from "@/components/respondent-side/my-participation";
import { getQuestionnairesFilled } from "@/lib/action/form";
import { auth } from "@/auth";
import { UserRoleEnum } from "@/lib/types/auth";
import { Session } from "next-auth";
import { BareForm } from "@/lib/types";
import { ResponseWrapper } from "@/components/creator-side/response/ResponseWrapper";

export default async function Response() {
  const session = (await auth()) as Session;
  let isError: boolean = false;

  const forms: BareForm[] = await getForms();

  async function getForms() {
    try {
      if (session.user.activeRole === UserRoleEnum.Respondent) {
        return await getQuestionnairesFilled();
      }
    } catch (error) {
      console.log((error as Error).message);
      isError = true;
    }
    return [];
  }

  return (
    <section className="flex flex-col h-full w-full absolute">
      {session.user.activeRole === UserRoleEnum.Respondent && (
        <MPWrapper forms={forms} isError={isError} />
      )}
      {session.user.activeRole === UserRoleEnum.Creator && <ResponseWrapper />}
    </section>
  );
}
