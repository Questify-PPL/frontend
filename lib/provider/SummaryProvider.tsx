import { useMemo, useState } from "react";
import { SummaryContext } from "../context/SummaryContext";
import { SummarizeFormAsProps } from "../types";

type SummaryProviderProps = {
  children: React.ReactNode;
} & SummarizeFormAsProps;

export function SummaryProvider({
  children,
  formStatistics,
  questionsWithAnswers,
  allIndividuals,
  formId,
  session,
}: Readonly<SummaryProviderProps>) {
  const [activeTab, setActiveTab] = useState<
    "summary" | "question" | "individual"
  >("summary");

  const [graphType, setGraphType] = useState<"bar" | "pie">("pie");
  const [currentPage, setCurrentPage] = useState(1);

  const [isFinishedFetching, setIsFinishedFetching] = useState(false);

  const returns = useMemo(() => {
    return {
      formStatistics,
      questionsWithAnswers,
      allIndividuals,
      graphType,
      setGraphType,
      activeTab,
      setActiveTab,
      currentPage,
      setCurrentPage,
      questionDetails: questionsWithAnswers
        ? questionsWithAnswers[currentPage - 1]
        : undefined,

      isFinishedFetching,
      setIsFinishedFetching,
      formId,
      session,
    };
  }, [
    formStatistics,
    questionsWithAnswers,
    allIndividuals,
    graphType,
    activeTab,
    currentPage,
    isFinishedFetching,
    formId,
    session,
  ]);

  return (
    <SummaryContext.Provider value={returns}>
      {children}
    </SummaryContext.Provider>
  );
}
