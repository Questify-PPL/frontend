import { Session } from "next-auth";

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
  winnerAmount?: number;
  formIsReported: boolean;
  link?: string;
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
  allIndividuals: {
    respondentId: string;
    name: string;
    email: string;
    isReported: boolean;
  }[];
  formId: string;
  session: Session;
  initialActiveTab: "summary" | "question" | "individual";
};

export type AnswerAndChoice = {
  answer: string[] | string;
  choice?: string[];
};

export type QuestionGroupedWithAnswerAndChoice = QuestionGrouped &
  AnswerAndChoice;

export type SectionGroupedWithAnswer = SectionParent & {
  questions: QuestionGroupedWithAnswerAndChoice[];
};

export type Questions = (
  | SectionGroupedWithAnswer
  | QuestionGroupedWithAnswerAndChoice
)[];

export type QuestionDetailResponse = {
  questions: Questions;
};

export type QuestionGet = {
  sectionId: number | null;
  questionId: number;
  number: number;
  questionType: string;
  questionTypeName: string;
  isRequired: boolean;
  question: string;
  description: string;
};

export type SectionGet = {
  sectionId: number | null;
  number: number;
  name: string;
  description: string;
  questions: QuestionGet[];
};

export type QuestionnaireGetItem = SectionGet | QuestionGet;
