/* eslint-disable no-unused-vars */
"use client";

import { createContext } from "react";
import { Metadata } from "../types";

export interface Question {
  questionId: number | null;
  questionType: string;
  questionTypeName: string;
  isRequired: boolean;
  question: string;
  description?: string;
  choice?: string[];
  number: number;
}

export interface Answer {
  questionId: number;
  answer?: string | string[];
}

export enum QuestionnaireItemTypes {
  SECTION = "SECTION",
  DEFAULT = "DEFAULT",
}

export interface Section {
  type: QuestionnaireItemTypes.SECTION;
  sectionId: number | null;
  sectionName: string;
  sectionDescription: string;
  number: number;
  questions: Question[];
}

export interface DefaultQuestion {
  type: QuestionnaireItemTypes.DEFAULT;
  question: Question;
}

export type QuestionnaireItem = Section | DefaultQuestion;

export interface QuestionnaireContextType {
  questionnaire: QuestionnaireItem[];
  answers: Answer[];
  errorStatus: boolean;
  activeQuestion: number | undefined;
  publishDate: Date | undefined;
  metadata: Metadata;
  setQuestionnaire: React.Dispatch<React.SetStateAction<QuestionnaireItem[]>>;
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
  setErrorStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveQuestion: React.Dispatch<React.SetStateAction<number | undefined>>;
  setPublishDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setMetadata: React.Dispatch<React.SetStateAction<Metadata>>;

  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  publishHandler: () => Promise<void>;
  isFinished: boolean;

  isPublishNow: boolean;
  setIsPublishNow: React.Dispatch<React.SetStateAction<boolean>>;

  link: string;
}

export const QuestionnaireContext = createContext<
  QuestionnaireContextType | undefined
>(undefined);
