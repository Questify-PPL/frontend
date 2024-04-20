import { useMemo, useState } from "react";
import { SummaryContext } from "../context/SummaryContext";
import { Questions, SummarizeFormAsProps } from "../types";

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
  initialActiveTab,
}: Readonly<SummaryProviderProps>) {
  const [activeTab, setActiveTab] = useState<
    "summary" | "question" | "individual"
  >(initialActiveTab);

  const [graphType, setGraphType] = useState<"bar" | "pie" | "doughnut">("pie");
  const [currentPage, setCurrentPage] = useState(1);

  const [isFinishedFetching, setIsFinishedFetching] = useState(false);
  const [individualFormQuestions, setIndividualFormQuestions] = useState<
    Questions | undefined
  >(undefined);

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
      individualFormQuestions,
      setIndividualFormQuestions,
      initialActiveTab,
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
    individualFormQuestions,
    initialActiveTab,
  ]);

  return (
    <SummaryContext.Provider value={returns}>
      {children}
    </SummaryContext.Provider>
  );
}
