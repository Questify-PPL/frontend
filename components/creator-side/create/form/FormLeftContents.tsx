import { useQuestionnaireContext } from "@/lib/hooks/useQuestionnaireContext";
import {
  QuestionToggle,
  SectionToggle,
} from "@/components/creator-side/create/form";
import { QuestionGroup as group } from "@/lib/services/form";
import { QuestionnaireItemTypes } from "@/lib/context";

export function FormLeftContents() {
  const { questionnaire, activeQuestion, setActiveQuestion } =
    useQuestionnaireContext();

  return (
    <div className="flex flex-col overflow-y-auto gap-1.5">
      {questionnaire.map((questionnaireItem) => {
        const item = questionnaireItem;

        if (item.type === QuestionnaireItemTypes.SECTION) {
          const section = item;
          if (
            section.sectionName === group.OPENING ||
            section.sectionName === group.ENDING
          ) {
            return null;
          }
          return (
            <SectionToggle numbering={section.number} key={section.sectionId}>
              {section.questions?.map((question) => {
                return (
                  <QuestionToggle
                    key={question.questionId}
                    isActive={activeQuestion === question.questionId}
                    numbering={question.number}
                    questionType={question?.questionTypeName}
                    question={question.question}
                    onSelect={() =>
                      setActiveQuestion(question.questionId as number)
                    }
                  />
                );
              })}
            </SectionToggle>
          );
        } else {
          const defaultQuestion = item;
          const question = defaultQuestion.question;
          return (
            <QuestionToggle
              key={question.questionId}
              isActive={activeQuestion === question.questionId}
              numbering={question.number}
              questionType={question.questionTypeName}
              question={
                question.question === ""
                  ? "Your question here"
                  : question.question
              }
              onSelect={() => setActiveQuestion(question.questionId as number)}
            />
          );
        }
      })}
    </div>
  );
}
