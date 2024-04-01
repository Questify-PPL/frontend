import { CreateWrapper } from "@/components/creator-side/create/CreateWrapper";
import { getQuestionnairesOwned } from "@/lib/action/form";
import { BareForm } from "@/lib/types";

export default async function Create() {
  const forms = await getForms();

  async function getForms() {
    let forms: BareForm[] = [];

    try {
      forms = await getQuestionnairesOwned();
    } catch (error) {}

    return forms;
  }

  return (
    <section className="flex flex-col h-full w-full absolute">
      <CreateWrapper forms={forms} />
    </section>
  );
}
