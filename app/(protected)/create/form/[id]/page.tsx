import FormWrapper from "@/components/creator-side/create/form/FormWrapper";
import { QuestionnaireProvider } from "@/lib/provider/QuestionnaireProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Form",
  description: "Questify - Create a new form",
};

interface FormProps {
  params: {
    id: string;
  };
}

export default function Form({ params }: Readonly<FormProps>) {
  const { id } = params;

  return (
    <div className="flex h-full w-full absolute">
      <QuestionnaireProvider>
        <FormWrapper id={id} />
      </QuestionnaireProvider>
    </div>
  );
}
