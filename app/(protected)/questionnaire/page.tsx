import { QuestionnaireWrapper } from "@/components/respondent-side/QuestionnaireWrapper";
import { getQuestionnairesFilled } from "@/lib/action/form";

export default async function Questionnaire() {
  const forms = await getQuestionnairesFilled();

  return (
    <section className="flex flex-col h-full w-full absolute">
      <QuestionnaireWrapper forms={forms} />
    </section>
  );
}
