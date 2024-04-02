import { Dispatch, SetStateAction, createContext, useContext } from "react";
import {
  QuestionAnswer,
  QuestionWithAnswerSection,
  SummarizeFormAsProps,
} from "../types";

export type SummaryContextValue = SummarizeFormAsProps & {
  graphType: "bar" | "pie";
  // eslint-disable-next-line no-unused-vars
  setGraphType: (type: "bar" | "pie") => void;
  activeTab: "summary" | "question" | "individual";
  // eslint-disable-next-line no-unused-vars
  setActiveTab: (tab: "summary" | "question" | "individual") => void;
  currentPage: number;
  // eslint-disable-next-line no-unused-vars
  setCurrentPage: Dispatch<SetStateAction<number>>;

  questionDetails: QuestionAnswer | QuestionWithAnswerSection;
};

export const SummaryContext = createContext({} as SummaryContextValue);

export function useSummaryContext() {
  const context = useContext(SummaryContext);

  if (!context) {
    throw new Error("useSummaryContext must be used within a SummaryProvider");
  }

  return context;
}
