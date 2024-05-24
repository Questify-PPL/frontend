import { CreateWrapper } from "@/components/creator-side/create/CreateWrapper";
import { getQuestionnairesOwned } from "@/lib/action";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Form",
  description: "Questify - Create a new form",
};

export default async function Create() {
  const forms = await getQuestionnairesOwned("UNPUBLISHED");

  return (
    <section className="flex flex-col h-full w-full absolute">
      <CreateWrapper forms={forms} />
    </section>
  );
}
