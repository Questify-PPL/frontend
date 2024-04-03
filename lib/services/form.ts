import { DefaultQuestion, QuestionnaireItem, Section } from "../context";
import { QuestionGet, QuestionnaireGetItem, SectionGet } from "../types";

export function transformData(
  data: QuestionnaireGetItem[]
): QuestionnaireItem[] {
  return data.map((item) => {
    if (
      (item as SectionGet).sectionId !== null &&
      (item as SectionGet).questions
    ) {
      const section = item as SectionGet;
      const questions = section.questions.map((question) => ({
        questionId: question.questionId,
        questionType: question.questionType,
        questionTypeName: question.questionTypeName,
        isRequired: question.isRequired,
        question: question.question,
        description: question.description,
        choice: [],
      }));
      return {
        type: "SECTION",
        sectionId: section.sectionId,
        sectionName: section.name,
        sectionDescription: section.description,
        questions: questions,
      } as Section;
    } else {
      const question = item as QuestionGet;
      return {
        type: "DEFAULT",
        question: {
          questionId: question.questionId,
          questionType: question.questionType,
          questionTypeName: question.questionTypeName,
          isRequired: question.isRequired,
          question: question.question,
          description: question.description,
        },
      } as DefaultQuestion;
    }
  });
}

