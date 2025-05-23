import { QuestionnaireWrapper } from "@/components/respondent-side/QuestionnaireWrapper";
import { getAllAvailableForm } from "@/lib/action/form";
import { BareForm } from "@/lib/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Questionnaire",
  description: "Questify - Questionnaire Page",
};

export default async function Questionnaire() {
  const forms = await getForms();

  async function getForms() {
    let forms: BareForm[] = [];

    try {
      forms = await getAllAvailableForm();
    } catch (error) {}

    return forms;
  }

  return (
    <section className="flex flex-col h-full w-full absolute">
      <QuestionnaireWrapper forms={forms} />
    </section>
  );
}
