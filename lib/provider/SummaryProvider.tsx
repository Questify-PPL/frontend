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
  const [graphType, setGraphType] = useState<"bar" | "pie">("pie");

  const returns = useMemo(() => {
    return {
      formStatistics,
      questionsWithAnswers,
      allIndividuals,
      graphType,
      setGraphType,
    };
  }, [formStatistics, questionsWithAnswers, allIndividuals, graphType]);

  return (
    <SummaryContext.Provider value={returns}>
      {children}
    </SummaryContext.Provider>
  );
}
