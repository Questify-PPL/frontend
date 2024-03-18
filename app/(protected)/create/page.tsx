import { CreateWrapper } from "@/components/creator-side/create/CreateWrapper";
import { getQuestionnairesOwned } from "@/lib/action/form";

export default async function Create() {
  const forms = await getQuestionnairesOwned();

  return (
    <section className="flex flex-col h-full w-full absolute">
      <CreateWrapper forms={forms} />
    </section>
  );
}
