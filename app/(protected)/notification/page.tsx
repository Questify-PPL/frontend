import NotificationCard from "@/components/notification/NotificationCard";
import { getQuestionnairesFilled } from "@/lib/action";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { UserRoleEnum } from "@/lib/types/auth";
import { BareForm } from "@/lib/types";

export default async function Notification() {
  const session = (await auth()) as Session;

  const forms: BareForm[] = await getForms();

  async function getForms() {
    try {
      if (session.user.activeRole === UserRoleEnum.Respondent) {
        return await getQuestionnairesFilled();
      }
    } catch (error) {}
    return [];
  }

  return (
    <section className="flex flex-col items-center h-full w-full absolute gap-2">
      <span className="font-bold text-xl mt-5 mb-5 flex justify-center">
        Notifications
      </span>
      {forms.map((form) => (
        <NotificationCard key={form.id} form={form} />
      ))}
    </section>
  );
}
