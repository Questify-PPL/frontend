import QuestionnaireJoinWrapper from "@/components/respondent-side/join/QuestionnaireJoinWrapper";
import { QuestionnaireProvider } from "@/lib/provider/QuestionnaireProvider";

interface Props {
  params: {
    id: string;
  };
}

const JoinForm = ({ params }: Props) => {
  const { id } = params;

  return (
    <div className="flex h-full w-full absolute">
      <QuestionnaireProvider>
        <QuestionnaireJoinWrapper id={id} />
      </QuestionnaireProvider>
    </div>
  );
};

export default JoinForm;
