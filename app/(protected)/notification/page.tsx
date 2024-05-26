import NotificationCard from "@/components/notification/NotificationCard";
import Separator from "@/components/notification/Separator";
import { getQuestionnairesFilled, markAllAsRead } from "@/lib/action";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { UserRoleEnum } from "@/lib/types/auth";
import { BareForm } from "@/lib/types";

export default async function Notification() {
  const session = (await auth()) as Session;
  const forms: BareForm[] = await getForms();
  const unreadForms = forms.filter((form) => !form.notificationRead);
  const readForms = forms.filter((form) => form.notificationRead);

  async function getForms() {
    let result: BareForm[] = [];
    try {
      if (session.user.activeRole === UserRoleEnum.Respondent) {
        result = await getQuestionnairesFilled();
        await markAllAsRead();
      }
    } catch (error) {}
    return result;
  }

  return (
    <section className="flex flex-col items-center h-full w-full absolute gap-2">
      <span className="font-bold text-xl mt-5 mb-5 flex justify-center">
        Notifications
      </span>
      {unreadForms.map((form) => (
        <NotificationCard key={form.id} form={form} />
      ))}
      {unreadForms.length > 0 && readForms.length > 0 && <Separator />}
      {readForms.map((form) => (
        <NotificationCard key={form.id} form={form} />
      ))}
    </section>
  );
}
