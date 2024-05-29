import { FormsAsProps } from "@/lib/types";
import { ActiveQuestionnaire } from "./ActiveQuestionnaire";

export function ActiveQuestionnaireList({ forms }: Readonly<FormsAsProps>) {
  console.log(forms);
  return (
    <div className="flex flex-col gap-[10px] min-h-[16rem] mt-4 px-2 w-full">
      <div className="text-[#32636A] text-[10px] font-semibold">
        Here are your active questionnaire(s)
      </div>
      {forms
        .filter((form) => form.isPublished && !form.isDraft)
        .map((form) => (
          <ActiveQuestionnaire form={form} key={form.id} />
        ))}
    </div>
  );
}
