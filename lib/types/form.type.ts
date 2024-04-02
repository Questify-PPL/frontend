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

export type SectionGrouped = {
  sectionId: number;
  name: string;
  description: string;
  questions: QuestionStatistic[];
};

export type QuestionStatistic = {
  sectionId: number | null;
  questionId: number;
  questionType: "TEXT" | "RADIO" | "CHECKBOX";
  questionTypeName: string;
  isRequired: boolean;
  question: string;
  description: string;
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
};
