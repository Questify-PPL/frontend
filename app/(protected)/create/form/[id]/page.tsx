import FormWrapper from "@/components/creator-side/create/form/FormWrapper";
import { QuestionnaireProvider } from "@/lib/provider/QuestionnaireProvider";

interface FormProps {
  params: {
    id: string;
  };
}

const Form = ({ params }: FormProps) => {
  const { id } = params;

  return (
    <div className="flex h-full w-full absolute">
      <QuestionnaireProvider>
        <FormWrapper id={id} />
      </QuestionnaireProvider>
    </div>
  );
};

export default Form;
