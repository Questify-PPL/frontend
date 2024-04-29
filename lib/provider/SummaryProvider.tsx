import { useToast } from "@/components/ui/use-toast";
import { useCallback, useMemo, useState } from "react";
import { SummaryContext } from "../context/SummaryContext";
import { exportForm, removeUnnecessaryQuestions } from "../helper";
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
  const { toast } = useToast();

  const [graphType, setGraphType] = useState<"bar" | "pie" | "doughnut">("pie");
  const [currentPage, setCurrentPage] = useState(1);

  const [isFinishedFetching, setIsFinishedFetching] = useState(false);
  const [individualFormQuestions, setIndividualFormQuestions] = useState<
    Questions | undefined
  >(undefined);

  const exportData = useCallback(async () => {
    if (!session?.user?.accessToken || !formStatistics) return;

    setIsFinishedFetching(true);

    await exportForm(
      formId,
      session.user.accessToken,
      formStatistics.title,
      () => {
        toast({
          title: "Failed to export data",
          description: "Please try again later",
          variant: "destructive",
        });
      },
    );

    setIsFinishedFetching(false);
  }, [formStatistics, formId, session?.user?.accessToken, toast]);

  const individualFormQuestionsToBeShown = useMemo(() => {
    return removeUnnecessaryQuestions(individualFormQuestions);
  }, [individualFormQuestions]);

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
      individualFormQuestions: individualFormQuestionsToBeShown,
      setIndividualFormQuestions,
      initialActiveTab,
      exportData,
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
    individualFormQuestionsToBeShown,
    initialActiveTab,
    exportData,
  ]);

  return (
    <SummaryContext.Provider value={returns}>
      {children}
    </SummaryContext.Provider>
  );
}
