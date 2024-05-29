import { auth } from "@/auth";
import { CreateWrapper } from "@/components/creator-side/create/CreateWrapper";
import { getQuestionnairesOwned } from "@/lib/action";
import { Metadata } from "next";
import { Session } from "next-auth";

export const metadata: Metadata = {
  title: "Your Drafts",
  description: "Questify - Create a new form",
};

export default async function Create() {
  const forms = await getQuestionnairesOwned("UNPUBLISHED");
  const session = (await auth()) as Session;

  return (
    <section className="flex flex-col h-full w-full absolute">
      <CreateWrapper forms={forms} session={session} />
    </section>
  );
}
