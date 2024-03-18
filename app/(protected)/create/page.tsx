import { CreateWrapper } from "@/components/creator-side/create/CreateWrapper";
import { getQuestionnairesOwned } from "@/lib/action/form";

export default async function Create() {
  const forms = await getQuestionnairesOwned();

  return (
    <main className="flex flex-col h-full w-full">
      <CreateWrapper forms={forms.data} />;
    </main>
  );
}