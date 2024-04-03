import { Session } from "next-auth";
import { Section } from "../context";

export type BareForm = {
  id: string;
  creatorId?: string;
  title: string;
  prize: number;
  prizeType: "EVEN" | "LUCKY";
  maxWinner: number;
  createdAt: string;
  updatedAt: string;
  endedAt: string;
  ongoingParticipation: number;
  completedParticipation: number;
  questionFilled?: number;
  isCompleted?: boolean;
  questionAmount?: number;
  canRespond?: boolean;
  winningChance?: number;
  winningStatus?: boolean;
};

export type FetchListForm = {
  statusCode: number;
  message: string;
  data: BareForm[];
};

export type FetchIndividualForm = {
  statusCode: number;
  message: string;
  data: BareForm;
};

export type RadioStatistic = {
  choices: string[];
  amounts: number[];
};

export type SummarizeForm = BareForm & {
  questionsStatistics: SectionGrouped[] | QuestionStatistic[];
};

export type SectionParent = {
  sectionId: number;
  name: string;
  description: string;
};

export type SectionGrouped = SectionParent & {
  questions: QuestionStatistic[];
};

export type QuestionGrouped = {
  sectionId: number | null;
  questionId: number;
  questionType: "TEXT" | "RADIO" | "CHECKBOX";
  questionTypeName: string;
  isRequired: boolean;
  question: string;
  description: string;
};

export type QuestionStatistic = QuestionGrouped & {
  statistics: string[] | RadioStatistic;
};

export type QuestionAnswer = {
  sectionId: number | null;
  questionId: number;
  questionType: "TEXT" | "RADIO" | "CHECKBOX";
  questionTypeName: string;
  isRequired: boolean;
  question: string;
  description: string;
  occurence: {
    [key: string]: number;
  };
};

export type QuestionWithAnswerSection = {
  sectionId: number | null;
  name: string;
  description: string;
  questions: QuestionAnswer[];
};

export type SummarizeFormAsProps = {
  formStatistics: SummarizeForm;
  questionsWithAnswers: QuestionAnswer[] | QuestionWithAnswerSection[];
  allIndividuals: string[];
  formId: string;
  session: Session;
};

export type AnswerAndChoice = {
  answer: string[] | string;
  choice?: string[];
};

export type QuestionGroupedWithAnswerAndChoice = QuestionGrouped &
  AnswerAndChoice;

export type SectionGroupedWithAnswer = SectionParent & {
  questions: QuestionGrouped & AnswerAndChoice[];
};

export type QuestionDetailResponse = {
  questions: SectionGroupedWithAnswer[] | QuestionGroupedWithAnswerAndChoice[];
};
