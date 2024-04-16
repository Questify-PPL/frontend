import { Dispatch, SetStateAction, createContext, useContext } from "react";
import {
  QuestionAnswer,
  QuestionDetailResponse,
  QuestionWithAnswerSection,
  SummarizeFormAsProps,
} from "../types";

export type SummaryContextValue = SummarizeFormAsProps & {
  graphType: "bar" | "pie" | "doughnut";
  // eslint-disable-next-line no-unused-vars
  setGraphType: (type: "bar" | "pie" | "doughnut") => void;
  activeTab: "summary" | "question" | "individual";
  // eslint-disable-next-line no-unused-vars
  setActiveTab: (tab: "summary" | "question" | "individual") => void;
  currentPage: number;
  // eslint-disable-next-line no-unused-vars
  setCurrentPage: Dispatch<SetStateAction<number>>;

  questionDetails: QuestionAnswer | QuestionWithAnswerSection | undefined;
  isFinishedFetching: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsFinishedFetching: Dispatch<SetStateAction<boolean>>;

  individualFormQuestions: QuestionDetailResponse | undefined;
  // eslint-disable-next-line no-unused-vars
  setIndividualFormQuestions: Dispatch<
    SetStateAction<QuestionDetailResponse | undefined>
  >;
};

export const SummaryContext = createContext({} as SummaryContextValue);

export function useSummaryContext() {
  const context = useContext(SummaryContext);

  if (!context) {
    throw new Error("useSummaryContext must be used within a SummaryProvider");
  }

  return context;
}
