"use client";

import { createContext } from "react";

export interface Question {
  questionId: number | null;
  questionType: string;
  questionTypeName: string;
  isRequired: boolean;
  question: string;
  description?: string;
  choice?: string[];
}

export interface Answer {
  questionId: number;
  answer?: string | string[];
}

export interface Section {
  type: "SECTION";
  sectionId: number | null;
  sectionName: string;
  sectionDescription: string;
  questions: Question[];
}

export interface DefaultQuestion {
  type: "DEFAULT";
  question: Question;
}

export type QuestionnaireItem = Section | DefaultQuestion;

export interface QuestionnaireContextType {
  questionnaire: QuestionnaireItem[];
  answers: Answer[];
  errorStatus: boolean;
  setQuestionnaire: React.Dispatch<React.SetStateAction<QuestionnaireItem[]>>;
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
  setErrorStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export const QuestionnaireContext = createContext<
  QuestionnaireContextType | undefined
>(undefined);
