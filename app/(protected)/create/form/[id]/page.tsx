import FormWrapper from "@/components/creator-side/create/form/FormWrapper";
import QuestionGetter from "@/components/creator-side/create/form/QuestionGetter";
import { QuestionnaireProvider } from "@/lib/provider/QuestionnaireProvider";

interface Props {
  params: {
    id: string;
  };
}

const Form = ({ params }: Props) => {
  const { id } = params;

  return (
    <div className="flex h-full w-full absolute">
      <QuestionnaireProvider>
        <QuestionGetter id={id} />
        <FormWrapper />
      </QuestionnaireProvider>
    </div>
  );
};

export default Form;
