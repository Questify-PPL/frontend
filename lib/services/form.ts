/* eslint-disable no-unused-vars */
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

const questionTemplates: { [key in QuestionTypeNames]: any } = {
  [QuestionTypeNames.SHORT_TEXT]: {
    type: "DEFAULT",
    question: {
      questionType: "TEXT",
      questionTypeName: "Short Text",
      isRequired: false,
      question: "",
    },
  },
  [QuestionTypeNames.LONG_TEXT]: {
    type: "DEFAULT",
    question: {
      questionType: "TEXT",
      questionTypeName: "Long Text",
      isRequired: false,
      question: "",
    },
  },
  [QuestionTypeNames.CHECKBOX]: {
    type: "DEFAULT",
    question: {
      questionType: "CHECKBOX",
      questionTypeName: "Checkboxes",
      isRequired: false,
      question: "",
      choice: [],
    },
  },
  [QuestionTypeNames.MULTIPLE_CHOICE]: {
    type: "DEFAULT",
    question: {
      questionType: "RADIO",
      questionTypeName: "Multiple Choice",
      isRequired: false,
      question: "",
      choice: [],
    },
  },
  [QuestionTypeNames.PICTURE_CHOICE]: undefined,
  [QuestionTypeNames.YES_NO]: {
    type: "DEFAULT",
    question: {
      questionType: "RADIO",
      questionTypeName: "Yes/No",
      isRequired: false,
      question: "",
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

export function questionTypeHandler(type: QuestionTypeNames) {
  const template = questionTemplates[type];
  return template ? [{ ...template }] : [];
}
