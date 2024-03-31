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
  statistics: string[] | RadioStatistic;
};

type Answer = {
  [key: string]: number;
};

export type QuestionsWithAnswer = {
  sectionId?: number;
  questionId: number;
  questionType: "TEXT" | "RADIO" | "CHECKBOX";
  questionTypeName: string;
  isRequired: boolean;
  question: string;
  description: string;
  answers: Answer;
};

export type SummarizeFormAsProps = {
  formStatistics: SummarizeForm;
  questionsWithAnswers: QuestionsWithAnswer;
  allIndividuals: string[];
};
