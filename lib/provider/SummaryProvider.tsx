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
}: Readonly<SummaryProviderProps>) {
  const [activeTab, setActiveTab] = useState<
    "summary" | "question" | "individual"
  >("summary");

  const [graphType, setGraphType] = useState<"bar" | "pie">("pie");
  const [currentPage, setCurrentPage] = useState(1);

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
      questionDetails: questionsWithAnswers[currentPage - 1],
    };
  }, [
    formStatistics,
    questionsWithAnswers,
    allIndividuals,
    graphType,
    activeTab,
    currentPage,
  ]);

  return (
    <SummaryContext.Provider value={returns}>
      {children}
    </SummaryContext.Provider>
  );
}
