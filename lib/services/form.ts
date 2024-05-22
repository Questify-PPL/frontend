/* eslint-disable no-unused-vars */
import {
  DefaultQuestion,
  Question,
  QuestionnaireItem,
  QuestionnaireItemTypes,
  Section,
} from "../context";
import { QuestionGet, QuestionnaireGetItem } from "../types";

export function transformData(
  data: QuestionnaireGetItem[],
): QuestionnaireItem[] {
  return data.map((item) => {
    if (
      item &&
      "sectionId" in item &&
      item.sectionId !== null &&
      "questions" in item
    ) {
      const section = item;
      const questions = section.questions.map((question) => ({
        number: question.number,
        questionId: question.questionId,
        questionType: question.questionType,
        questionTypeName: question.questionTypeName,
        isRequired: question.isRequired,
        question: question.question,
        description: question.description,
        choice: [],
      }));
      return {
        type: QuestionnaireItemTypes.SECTION,
        sectionId: section.sectionId,
        number: section.number,
        sectionName: section.name,
        sectionDescription: section.description,
        questions: questions,
      } as Section;
    } else {
      const question = item as QuestionGet;
      return {
        type: QuestionnaireItemTypes.DEFAULT,
        question: {
          number: question.number,
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

export function findQuestionById(
  questionId: number,
  questionnaire: QuestionnaireItem[],
): {
  question?: Question;
  sectionId: number | null;
} {
  let sectionId: number | null = null;

  for (const item of questionnaire) {
    if (item.type === QuestionnaireItemTypes.SECTION) {
      sectionId = item.sectionId ?? null;
      const foundQuestion = item.questions?.find(
        (question) => question.questionId === questionId,
      );
      if (foundQuestion) {
        return { question: foundQuestion, sectionId };
      }
    } else if (
      item.type === QuestionnaireItemTypes.DEFAULT &&
      item.question?.questionId === questionId
    ) {
      return { question: item.question, sectionId: null };
    }
  }
  return { question: undefined, sectionId: null };
}

export const handleMoveUp = async (
  questionnaire: QuestionnaireItem[],
  activeQuestion: number,
) => {
  try {
    const { question, sectionId } = findQuestionById(
      activeQuestion,
      questionnaire,
    );

    if (question && question.number > 1) {
      if (sectionId !== null) {
        const sectionIndex = questionnaire.findIndex(
          (item) =>
            item.type === QuestionnaireItemTypes.SECTION &&
            item.sectionId === sectionId,
        );
        const section = questionnaire[sectionIndex] as Section;
        const sectionQuestions = section.questions;
        const previousQuestionIndex = sectionQuestions.findIndex(
          (item) => item.number === question.number - 1,
        );
        sectionQuestions[previousQuestionIndex].number += 1;
        question.number -= 1;
      } else {
        const itemIndex = questionnaire.findIndex(
          (item) =>
            (item.type === QuestionnaireItemTypes.DEFAULT &&
              item.question.number === question.number - 1) ||
            (item.type === QuestionnaireItemTypes.SECTION &&
              item.number === question.number - 1),
        );

        if (questionnaire[itemIndex].type === QuestionnaireItemTypes.DEFAULT) {
          (questionnaire[itemIndex] as DefaultQuestion).question.number += 1;
        } else {
          (questionnaire[itemIndex] as Section).number += 1;
        }
        question.number -= 1;
      }
    }
  } catch (error) {
    console.error("Failed to move the question up", error);
  }
};

export const handleMoveDown = async (
  questionnaire: QuestionnaireItem[],
  activeQuestion: number,
) => {
  try {
    const { question, sectionId } = findQuestionById(
      activeQuestion,
      questionnaire,
    );

    if (question && question.number < questionnaire.length) {
      if (sectionId !== null) {
        const sectionIndex = questionnaire.findIndex(
          (item) =>
            item.type === QuestionnaireItemTypes.SECTION &&
            item.sectionId === sectionId,
        );
        const section = questionnaire[sectionIndex] as Section;
        const sectionQuestions = section.questions;
        const nextQuestionIndex = sectionQuestions.findIndex(
          (item) => item.number === question.number + 1,
        );
        sectionQuestions[nextQuestionIndex].number -= 1;
        question.number += 1;
      } else {
        const itemIndex = questionnaire.findIndex(
          (item) =>
            (item.type === QuestionnaireItemTypes.DEFAULT &&
              item.question.number === question.number + 1) ||
            (item.type === QuestionnaireItemTypes.SECTION &&
              item.number === question.number + 1),
        );

        if (questionnaire[itemIndex].type === QuestionnaireItemTypes.DEFAULT) {
          (questionnaire[itemIndex] as DefaultQuestion).question.number -= 1;
        } else {
          (questionnaire[itemIndex] as Section).number -= 1;
        }
        question.number += 1;
      }
    }
  } catch (error) {
    console.error("Failed to move the question down", error);
  }
};

export const handleDuplicate = async (
  questionnaire: QuestionnaireItem[],
  activeQuestion: number,
) => {
  try {
    const { question, sectionId } = findQuestionById(
      activeQuestion,
      questionnaire,
    );

    if (question) {
      const duplicateQuestion = { ...question };
      duplicateQuestion.number += 1;
      duplicateQuestion.questionId = null;

      const index = questionnaire.findIndex(
        (item) =>
          (item.type === QuestionnaireItemTypes.DEFAULT &&
            item.question.number === question.number) ||
          (item.type === QuestionnaireItemTypes.SECTION &&
            item.number === question.number),
      );

      questionnaire.splice(index + 1, 0, {
        type:
          sectionId !== null
            ? QuestionnaireItemTypes.SECTION
            : QuestionnaireItemTypes.DEFAULT,
        sectionId: sectionId ?? undefined,
        question: duplicateQuestion,
      } as QuestionnaireItem);

      for (let i = index + 2; i < questionnaire.length; i++) {
        const item = questionnaire[i];
        if (item.type === QuestionnaireItemTypes.DEFAULT) {
          item.question.number += 1;
        } else {
          item.number += 1;
        }
      }
    }
  } catch (error) {
    console.error("Failed to duplicate the question", error);
  }
};

export enum FormLeftMenuState {
  OPENING = "OPENING",
  CONTENTS = "CONTENTS",
  ENDING = "ENDING",
}

export enum FormRightMenuState {
  QUESTION = "QUESTION",
  LOGIC = "LOGIC",
  DESIGN = "DESIGN",
  PUBLISH = "PUBLISH",
}

export enum QuestionTypeNames {
  SHORT_TEXT = "Short Text",
  LONG_TEXT = "Long Text",
  CHECKBOX = "Checkboxes",
  MULTIPLE_CHOICE = "Multiple Choice",
  PICTURE_CHOICE = "Picture Choice",
  YES_NO = "Yes/No",
  DROPDOWN = "Dropdown",
  MATRIX = "Matrix",
  NET_PROMOTER = "Net Promoter Score",
  RATING = "Rating",
  DATE = "Date",
  TIME = "Time",
  NUMBER = "Number",
  FILE_UPLOAD = "File Upload",
  LINK = "Link",
}

export enum QuestionGroup {
  OPENING = "Opening",
  ENDING = "Ending",
}

const questionTemplates: { [key in QuestionTypeNames]: any } = {
  [QuestionTypeNames.SHORT_TEXT]: {
    question: {
      questionType: "TEXT",
      questionTypeName: QuestionTypeNames.SHORT_TEXT,
    },
  },
  [QuestionTypeNames.LONG_TEXT]: {
    question: {
      questionType: "TEXT",
      questionTypeName: QuestionTypeNames.LONG_TEXT,
    },
  },
  [QuestionTypeNames.CHECKBOX]: {
    question: {
      questionType: "CHECKBOX",
      questionTypeName: QuestionTypeNames.CHECKBOX,
      choice: [],
    },
  },
  [QuestionTypeNames.MULTIPLE_CHOICE]: {
    question: {
      questionType: "RADIO",
      questionTypeName: QuestionTypeNames.MULTIPLE_CHOICE,
      choice: [],
    },
  },
  [QuestionTypeNames.PICTURE_CHOICE]: undefined,
  [QuestionTypeNames.YES_NO]: {
    question: {
      questionType: "RADIO",
      questionTypeName: QuestionTypeNames.YES_NO,
      choice: ["Yes", "No"],
    },
  },
  [QuestionTypeNames.DROPDOWN]: undefined,
  [QuestionTypeNames.MATRIX]: undefined,
  [QuestionTypeNames.NET_PROMOTER]: undefined,
  [QuestionTypeNames.RATING]: undefined,
  [QuestionTypeNames.DATE]: undefined,
  [QuestionTypeNames.TIME]: undefined,
  [QuestionTypeNames.NUMBER]: undefined,
  [QuestionTypeNames.FILE_UPLOAD]: undefined,
  [QuestionTypeNames.LINK]: undefined,
};

export function templateHandler(type: QuestionTypeNames, number: number) {
  const template = questionTemplates[type];

  if (!template) {
    return [];
  }

  const updatedTemplate = {
    ...template,
    type: QuestionnaireItemTypes.DEFAULT,
    question: {
      ...template.question,
      number: number,
      isRequired: false,
      question: "",
    },
  };

  return [updatedTemplate];
}
