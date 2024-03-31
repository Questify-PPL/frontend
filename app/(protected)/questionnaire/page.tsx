import { QuestionnaireWrapper } from "@/components/respondent-side/QuestionnaireWrapper";
import { getQuestionnairesFilled } from "@/lib/action/form";
import { BareForm } from "@/lib/types";

export default async function Questionnaire() {
  const forms = await getForms();

  async function getForms() {
    let forms: BareForm[] = [];

    try {
      forms = await getQuestionnairesFilled();
    } catch (error) {}

    return forms;
  }

  return (
    <section className="flex flex-col h-full w-full absolute">
      <QuestionnaireWrapper forms={forms} />
    </section>
  );
}
