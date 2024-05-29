import { Textarea } from "@/components/ui/textarea";
import { Question, QuestionnaireItemTypes, Section } from "@/lib/context";
import { useQuestionnaireContext } from "@/lib/hooks/useQuestionnaireContext";
import { RadioButton, Text, Checkboxes } from "@/components/questions";
import Image from "next/image";

export function TerminusRenderer({
  sectionKey,
  id,
}: Readonly<{
  sectionKey: string;
  id?: string;
}>) {
  const { questionnaire, setQuestionnaire } = useQuestionnaireContext();
  const label = sectionKey.charAt(0) + sectionKey.slice(1).toLowerCase();
  const section = questionnaire.find(
    (item) =>
      item.type === QuestionnaireItemTypes.SECTION &&
      item.sectionName === sectionKey,
  ) as Section | undefined;

  if (!section) return null;

  const handleSectionDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const updatedQuestionnaire = questionnaire.map((item) => {
      if (
        item.type === QuestionnaireItemTypes.SECTION &&
        item.sectionName === sectionKey
      ) {
        return {
          ...item,
          sectionDescription: event.target.value,
        };
      }
      return item;
    });

    setQuestionnaire(updatedQuestionnaire);
  };

  return (
    <div
      className="flex flex-col w-full h-full items-center justify-center gap-3"
      id={id}
    >
      <span className="text-xs text-primary font-medium">{label} Section</span>
      <Textarea
        className="text-sm w-full font-normal text-[#64748B] placeholder:text-primary/30 focus-visible:outline-none focus-visible:ring-0"
        placeholder={section.sectionDescription || "Enter description here"}
        onChange={handleSectionDescriptionChange}
      />
    </div>
  );
}

export const QuestionRenderer = ({
  q,
  isRequired,
}: {
  q: Question;
  isRequired: boolean;
}) => {
  let questionComponent;
  if (q.questionType === "TEXT") {
    questionComponent = (
      <Text
        role="CREATOR"
        numbering={q.number}
        questionId={q.questionId as number}
        questionTypeName={q.questionTypeName}
        isRequired={q.isRequired}
        question={q.question}
        description={q.description ?? ""}
        choice={q.choice ?? []}
        answer={""}
      />
    );
  } else if (q.questionType === "CHECKBOX") {
    questionComponent = (
      <Checkboxes
        role="CREATOR"
        numbering={q.number}
        questionId={q.questionId as number}
        questionTypeName={q.questionTypeName}
        isRequired={q.isRequired}
        question={q.question}
        description={q.description ?? ""}
        choice={q.choice ?? []}
        answer={[]}
      />
    );
  } else {
    questionComponent = (
      <RadioButton
        role="CREATOR"
        numbering={q.number}
        questionId={q.questionId as number}
        questionTypeName={q.questionTypeName}
        isRequired={q.isRequired}
        question={q.question}
        description={q.description ?? ""}
        choice={q.choice ?? []}
        answer={[]}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full" key={q.questionId}>
      {isRequired ? (
        <div className="w-full hidden md:flex h-1 bg-red-500 mb-2 rounded-2xl"></div>
      ) : (
        <div className="w-full hidden md:flex h-1 mb-2 rounded-2xl"></div>
      )}
      {questionComponent}
    </div>
  );
};

export function EmptyRenderer() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-3">
      <Image
        src="/assets/choose-question.svg"
        alt="Questify"
        width={70}
        height={16}
      />
      <div className="flex flex-col justify-center items-center">
        <span className="text-primary text-sm font-semibold">
          Select a question to start editing
        </span>
        <span className="text-[#95B0B4] text-xs">Watch the left pane :D</span>
      </div>
    </div>
  );
}
